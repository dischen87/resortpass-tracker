#!/usr/bin/env bash
# Build and verify locally, back up production, deploy, then verify the live site.
# --with-api also updates the tracked source and rebuilds only the API container.
# The checker, database, environment and other Caddy sites remain untouched.
set -Eeuo pipefail

REMOTE="${DEPLOY_REMOTE:-root@88.99.60.182}"
REMOTE_PROJECT="${DEPLOY_PROJECT_ROOT:-/opt/resortpass-tracker}"
REMOTE_ROOT="${DEPLOY_ROOT:-/opt/resortpass-tracker/dist}"
BACKUP_ROOT="${DEPLOY_BACKUP_ROOT:-/opt/resortpass-tracker/releases}"
CADDY_FRAGMENT="${DEPLOY_CADDY_FRAGMENT:-/opt/infrastructure/caddy/sites.d/resortpass.caddy}"
SITE="${DEPLOY_SITE_URL:-https://www.resortpass-europapark.ch}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
DRY_RUN=0
WITH_API=0
ROLLBACK=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --with-api) WITH_API=1 ;;
    --rollback) ROLLBACK=1 ;;
    *) printf 'Unknown option: %s\n' "$arg" >&2; exit 1 ;;
  esac
done
[[ "$ROLLBACK" == '1' && ( "$DRY_RUN" == '1' || "$WITH_API" == '1' ) ]] && { printf 'Use --rollback on its own\n' >&2; exit 1; }

cd "$(dirname "${BASH_SOURCE[0]}")/.."
log() { printf '\n==> %s\n' "$*"; }
die() { printf 'Deployment failed: %s\n' "$*" >&2; exit 1; }
# SSH assembles remote arguments through a shell. Restrict configurable paths
# before interpolation and refuse paths outside absolute directory syntax.
for path in "$REMOTE_PROJECT" "$REMOTE_ROOT" "$BACKUP_ROOT" "$CADDY_FRAGMENT"; do
  [[ "$path" =~ ^/[a-zA-Z0-9_./-]+$ && "$path" != '/' ]] || die "unsupported remote path"
done

if [[ "$ROLLBACK" == '1' ]]; then
  log 'Restoring the latest pre-release backup'
  ssh "$REMOTE" bash -s -- "$REMOTE_PROJECT" "$REMOTE_ROOT" "$BACKUP_ROOT" "$CADDY_FRAGMENT" <<'REMOTE'
set -Eeuo pipefail
project=$1; root=$2; backups=$3; fragment=$4
# Each timestamp is a backup taken BEFORE a release: the newest one is the
# previous production version, not the second-newest one.
previous=$(find "$backups" -mindepth 1 -maxdepth 1 -type d -name '[0-9]*T*Z' | sort -r | head -n 1)
[ -n "$previous" ] || { echo 'No backup found'; exit 1; }
if [ -d "$previous/www" ]; then
  source="$previous/www"
else
  source="$previous" # backups made by the older deploy script
fi
rsync -a --delete --exclude 'api/status.json' --exclude 'api/history-stats.json' "$source/" "$root/"
if [ -f "$previous/resortpass.caddy" ]; then
  cp "$previous/resortpass.caddy" "$fragment"
  docker exec caddy caddy validate --config /etc/caddy/Caddyfile
  docker exec caddy caddy reload --config /etc/caddy/Caddyfile
fi
if [ -f "$previous/api-image.txt" ]; then
  docker tag "$(cat "$previous/api-image.txt")" "$(cat "$previous/api-image-name.txt")"
  cd "$project"
  docker compose up -d --no-deps --no-build resortpass-api
fi
echo "Restored $previous"
REMOTE
  log 'Rollback finished; checking live'
  bun scripts/verify-live.ts "$SITE"
  exit 0
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  die 'commit tracked changes before deployment'
fi
REVISION=$(git rev-parse HEAD)
log 'Tests'
bun test
log 'Types'
bun run typecheck
log 'Build'
bun run build
log 'Static and SEO verification'
bun run verify:static
bun run verify:seo
[[ -f dist/index.html ]] || die 'dist/index.html missing'
PAGES=$(find dist -name 'index.html' | wc -l | tr -d ' ')
[[ "$PAGES" -gt 300 ]] || die "only $PAGES pages built"
log "Complete build: $PAGES pages, revision $REVISION"
[[ "$DRY_RUN" == '1' ]] && { log 'Dry run finished before upload'; exit 0; }
printf '{"revision":"%s","deployedAt":"%s"}\n' "$REVISION" "$STAMP" > dist/release.json

log 'Production preflight and backup'
ssh "$REMOTE" bash -s -- "$REMOTE_PROJECT" "$REMOTE_ROOT" "$BACKUP_ROOT" "$CADDY_FRAGMENT" "$STAMP" "$WITH_API" "$REVISION" <<'REMOTE'
set -Eeuo pipefail
project=$1; root=$2; backups=$3; fragment=$4; stamp=$5; with_api=$6; revision=$7
[ -d "$root" ] && [ -f "$fragment" ] || { echo 'Production paths missing'; exit 1; }
docker exec caddy caddy validate --config /etc/caddy/Caddyfile
pending="$backups/.pending-$stamp"
mkdir -p "$pending/www"
rsync -a "$root/" "$pending/www/"
cp "$fragment" "$pending/resortpass.caddy"
if [ "$with_api" == '1' ]; then
  cd "$project"
  git diff --quiet && git diff --cached --quiet || { echo 'Remote tracked WIP found'; exit 1; }
  docker inspect resortpass-api --format '{{.Image}}' > "$pending/api-image.txt"
  docker inspect resortpass-api --format '{{.Config.Image}}' > "$pending/api-image-name.txt"
fi
# Rollback must never select a partial snapshot left by an interrupted copy.
mv "$pending" "$backups/$stamp"
if [ "$with_api" == '1' ]; then
  git fetch origin
  git merge --ff-only "$revision"
  [ "$(git rev-parse HEAD)" = "$revision" ] || { echo 'Remote revision differs from requested release'; exit 1; }
  # Build before replacing static files or restarting the working container.
  docker compose build resortpass-api
fi
REMOTE

log 'Upload static release and project Caddy fragment'
# Preserve checker-owned runtime files. Never rsync the data/ or .env directory.
rsync -az --delete --human-readable --exclude '.DS_Store' \
  --exclude 'api/status.json' --exclude 'api/history-stats.json' \
  dist/ "${REMOTE}:${REMOTE_ROOT}/"
rsync -az deploy/resortpass.caddy "${REMOTE}:/tmp/resortpass-${STAMP}.caddy"

log 'Validate and activate configuration'
ssh "$REMOTE" bash -s -- "$REMOTE_PROJECT" "$BACKUP_ROOT" "$CADDY_FRAGMENT" "$STAMP" "$WITH_API" <<'REMOTE'
set -Eeuo pipefail
project=$1; backups=$2; fragment=$3; stamp=$4; with_api=$5
cp "/tmp/resortpass-$stamp.caddy" "$fragment"
if ! docker exec caddy caddy validate --config /etc/caddy/Caddyfile; then
  cp "$backups/$stamp/resortpass.caddy" "$fragment"
  echo 'Invalid fragment restored before reload'
  exit 1
fi
if ! docker exec caddy caddy reload --config /etc/caddy/Caddyfile; then
  cp "$backups/$stamp/resortpass.caddy" "$fragment"
  docker exec caddy caddy reload --config /etc/caddy/Caddyfile
  exit 1
fi
if [ "$with_api" == '1' ]; then
  cd "$project"
  docker compose up -d --no-deps --no-build resortpass-api
fi
rm "/tmp/resortpass-$stamp.caddy"
REMOTE

log "Live verification against $SITE"
if ! DEPLOY_EXPECTED_REVISION="$REVISION" DEPLOY_VERIFY_MCP="$WITH_API" bun scripts/verify-live.ts "$SITE"; then
  die 'live verification failed; latest backup is available with --rollback'
fi
log "Deployed $STAMP ($REVISION)"

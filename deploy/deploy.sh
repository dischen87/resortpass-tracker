#!/usr/bin/env bash
#
# Build locally, verify, ship, prove it worked.
#
# Until now the route from a change to the server existed only in the operator's
# head: no CI, no script, `dist/` gitignored, and a setup script whose comment
# says it assumes an rsync from a local machine. That is fine as an approach —
# the build is small and a VPS with 256 MB per container cannot run it anyway —
# but it needs to be written down and repeatable, because half the fixes in the
# audit are worthless if they cannot reliably reach production.
#
# Deliberately boring: no runner, no toolchain on the VPS, no new moving parts.
#
#   ./deploy/deploy.sh              build, verify, upload, smoke-test
#   ./deploy/deploy.sh --dry-run    everything except the upload
#   ./deploy/deploy.sh --rollback   restore the previous release
#
set -Eeuo pipefail

REMOTE="${DEPLOY_REMOTE:?set DEPLOY_REMOTE, e.g. deploy@example.com}"
REMOTE_ROOT="${DEPLOY_ROOT:-/srv/www}"
BACKUP_ROOT="${DEPLOY_BACKUP_ROOT:-/srv/www-releases}"
SITE="${DEPLOY_SITE_URL:-https://www.resortpass-europapark.ch}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

cd "$(dirname "${BASH_SOURCE[0]}")/.."

log() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
die() { printf '\033[31mfehlgeschlagen: %s\033[0m\n' "$*" >&2; exit 1; }

if [[ "${1:-}" == "--rollback" ]]; then
  log "Rolling back to the previous release"
  # shellcheck disable=SC2029  # remote expansion is intended
  ssh "$REMOTE" "set -e
    previous=\$(ls -1dt ${BACKUP_ROOT}/*/ 2>/dev/null | sed -n 2p)
    [ -n \"\$previous\" ] || { echo 'no previous release found'; exit 1; }
    echo \"restoring \$previous\"
    rsync -a --delete \"\$previous\" ${REMOTE_ROOT}/"
  log "Rolled back. Verify with: bun scripts/verify-live.ts"
  exit 0
fi

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

log "Tests"
bun test || die "tests"

log "Types"
bun run typecheck || die "typecheck"

log "Build"
bun run build || die "build"

log "Static and SEO verification of the build"
bun run verify:static || die "verify:static"
bun run verify:seo || die "verify:seo"

[[ -f dist/index.html ]] || die "dist/index.html missing — refusing to upload"
PAGES=$(find dist -name 'index.html' | wc -l | tr -d ' ')
[[ "$PAGES" -gt 300 ]] || die "only $PAGES pages built — refusing to upload a partial build"
log "Build looks complete: $PAGES pages"

if [[ "$DRY_RUN" == "1" ]]; then
  log "Dry run — stopping before upload"
  exit 0
fi

log "Backing up the current release"
# shellcheck disable=SC2029
ssh "$REMOTE" "set -e
  mkdir -p ${BACKUP_ROOT}/${STAMP}
  if [ -d ${REMOTE_ROOT} ] && [ -n \"\$(ls -A ${REMOTE_ROOT} 2>/dev/null)\" ]; then
    rsync -a ${REMOTE_ROOT}/ ${BACKUP_ROOT}/${STAMP}/
  fi
  # Keep the five most recent releases so a rollback always has somewhere to go.
  ls -1dt ${BACKUP_ROOT}/*/ 2>/dev/null | tail -n +6 | xargs -r rm -rf"

log "Uploading"
rsync -az --delete --human-readable \
  --exclude '.DS_Store' \
  dist/ "${REMOTE}:${REMOTE_ROOT}/" || die "rsync"

log "Smoke test against ${SITE}"
if ! bun scripts/verify-live.ts "$SITE"; then
  die "live verification failed — consider ./deploy/deploy.sh --rollback"
fi

log "Deployed ${STAMP}"

FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile 2>/dev/null || bun install

# Copy source
COPY . .

# PostHog build-time variables (Astro bakes PUBLIC_ vars at build time)
ARG PUBLIC_POSTHOG_KEY
ARG PUBLIC_POSTHOG_HOST=/a
ENV PUBLIC_POSTHOG_KEY=$PUBLIC_POSTHOG_KEY
ENV PUBLIC_POSTHOG_HOST=$PUBLIC_POSTHOG_HOST

# Build Astro site
RUN bun run build

# Create data directory for SQLite
RUN mkdir -p /app/data /app/dist-built

# Copy built dist to a separate location (won't be overridden by volume mount)
RUN cp -a /app/dist/. /app/dist-built/

# Create entrypoint script that syncs dist on startup
RUN echo '#!/bin/sh\n\
if [ -d /app/dist-built ] && [ "$(ls -A /app/dist-built)" ]; then\n\
  echo "Syncing built files to dist volume..."\n\
  cp -a /app/dist-built/. /app/dist/\n\
  mkdir -p /app/dist/api\n\
  echo "Sync complete."\n\
fi\n\
exec "$@"' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]

# Expose ports
EXPOSE 3000

# Default: run the API server
CMD ["bun", "run", "server/index.ts"]

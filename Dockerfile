FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile 2>/dev/null || bun install

# Copy source
COPY . .

# Build Astro site
RUN bun run build

# Create data directory for SQLite
RUN mkdir -p /app/data

# Expose ports
EXPOSE 3000

# Default: run the API server
CMD ["bun", "run", "server/index.ts"]

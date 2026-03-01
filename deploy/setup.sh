#!/bin/bash
set -euo pipefail

# ResortPass Tracker — Hetzner VPS Setup Script
echo "=== ResortPass Tracker Setup ==="

PROJECT_DIR="/opt/resortpass-tracker"

# Create project directory
mkdir -p "$PROJECT_DIR"

# Copy project files (assumes rsync from local)
echo "Project directory: $PROJECT_DIR"

# Build and start
cd "$PROJECT_DIR"

echo "Building and starting containers..."
docker compose up -d --build

echo ""
echo "=== Setup Complete ==="
echo "Site: https://www.resortpass-europapark.ch"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f          # View all logs"
echo "  docker compose logs -f checker  # View checker logs"
echo "  docker compose logs -f api      # View API logs"
echo "  docker compose restart           # Restart all services"
echo "  docker compose down              # Stop all services"
echo ""
echo "DNS Records needed:"
echo "  A     resortpass-europapark.ch       -> 88.99.60.182"
echo "  A     www.resortpass-europapark.ch   -> 88.99.60.182"
echo "  A     mail.resortpass-europapark.ch  -> 88.99.60.182"
echo "  TXT   resortpass-europapark.ch       -> v=spf1 ip4:88.99.60.182 -all"
echo "  TXT   _dmarc.resortpass-europapark.ch -> v=DMARC1; p=quarantine; rua=mailto:dmarc@resortpass-europapark.ch"
echo "  MX    resortpass-europapark.ch       -> mail.resortpass-europapark.ch (priority 10)"

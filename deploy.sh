#!/bin/bash
set -euo pipefail
PROJECT="ristointour"
DIR="/var/www/clients/ristointour"
LOG="/var/log/deploy-$PROJECT.log"

echo "[$(date)] Deploy $PROJECT started" | tee -a "$LOG"

cd "$DIR"

# Pull latest code
echo "Pulling latest code..."
git pull origin main 2>&1 | tee -a "$LOG"

# Install dependencies
echo "Installing dependencies..."
npm ci --production 2>&1 | tail -3 | tee -a "$LOG"

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate 2>&1 | tail -3 | tee -a "$LOG"

# Apply DB migrations (if any)
echo "Applying DB migrations..."
npx prisma db push 2>&1 | tail -5 | tee -a "$LOG"

# Build
echo "Building..."
npm run build 2>&1 | tail -5 | tee -a "$LOG"

# Restart via PM2
echo "Restarting..."
pm2 restart "$PROJECT" 2>&1 | tail -5 | tee -a "$LOG"

# Health check
sleep 3
STATUS=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 http://127.0.0.1:3002)
if [ "$STATUS" = "200" ]; then
    echo "[$(date)] Deploy $PROJECT SUCCESS (HTTP $STATUS)" | tee -a "$LOG"
else
    echo "[$(date)] Deploy $PROJECT WARNING: HTTP $STATUS" | tee -a "$LOG"
    exit 1
fi

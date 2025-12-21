#!/bin/bash
set -e

# Deploy PostgreSQL to Unikraft Cloud with persistent volume
# Usage: ./deploy-postgres.sh [password]

POSTGRES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VOLUME_NAME="photos-volume"
VOLUME_MOUNT="/volume"
PGDATA_PATH="/volume/postgres"
POSTGRES_PASSWORD="${1:-unikraft}"
MEMORY="1024"  # Memory in MB
PORT="5432"
METRO="${UKC_METRO:-fra}"

echo "🐘 Deploying PostgreSQL to Unikraft Cloud"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Configuration:"
echo "  🌍 Metro: $METRO"
echo "  💾 Memory: ${MEMORY}MB"
echo "  🔐 Password: ${POSTGRES_PASSWORD:0:3}***"
echo "  📂 Data dir: $PGDATA_PATH"
echo "  🗄️  Volume: $VOLUME_NAME → $VOLUME_MOUNT"
echo "  🔌 Port: $PORT"
echo ""

# Check if kraft CLI is available
if ! command -v kraft &> /dev/null; then
  echo "❌ kraft CLI not found"
  echo "💡 Install from: https://unikraft.org/docs/cli"
  exit 1
fi

# Check if UKC_TOKEN is set
if [ -z "$UKC_TOKEN" ]; then
  echo "❌ UKC_TOKEN not set"
  echo "💡 Set your Unikraft Cloud token:"
  echo "   export UKC_TOKEN=your-token"
  exit 1
fi

# Check if volume exists
echo "🔍 Checking if volume '$VOLUME_NAME' exists..."
if ! kraft cloud volume list | grep -q "$VOLUME_NAME"; then
  echo "❌ Volume '$VOLUME_NAME' not found"
  echo ""
  echo "💡 Create it first:"
  echo "   cd $POSTGRES_DIR"
  echo "   ./create-volume.sh"
  exit 1
fi

echo "✅ Volume found"
echo ""

# Deploy PostgreSQL
echo "🚀 Deploying PostgreSQL to Unikraft Cloud..."
echo ""

cd "$POSTGRES_DIR"

kraft cloud deploy \
  --metro "$METRO" \
  --env POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
  --env PGDATA="$PGDATA_PATH" \
  --volume "$VOLUME_NAME:$VOLUME_MOUNT" \
  --port "$PORT:$PORT/tls" \
  --memory "$MEMORY" \
  .

if [ $? -ne 0 ]; then
  echo "❌ Deployment failed"
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ PostgreSQL deployed successfully!"
echo ""

# Get instance details
echo "📋 Instance details:"
INSTANCE_NAME=$(kraft cloud instance list | grep postgres | awk '{print $1}' | head -1)
if [ -n "$INSTANCE_NAME" ]; then
  echo "   Name: $INSTANCE_NAME"
  FQDN=$(kraft cloud instance get "$INSTANCE_NAME" | grep "fqdn:" | awk '{print $2}')
  if [ -n "$FQDN" ]; then
    echo "   FQDN: $FQDN"
    echo ""
    echo "🔌 Connect to PostgreSQL:"
    echo "   psql -U postgres -h $FQDN"
    echo ""
    echo "📝 Connection string:"
    echo "   postgresql://postgres:$POSTGRES_PASSWORD@$FQDN:$PORT/postgres"
  fi
fi

echo ""
echo "💡 Next steps:"
echo "   1. Check status: kraft cloud instance list"
echo "   2. View logs: kraft cloud instance logs $INSTANCE_NAME"
echo "   3. Connect: psql -U postgres -h [FQDN]"
echo "   4. Manage: ./postgres/manage-postgres.sh"

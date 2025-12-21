#!/bin/bash
set -e

# Create Unikraft Cloud volume for PostgreSQL data persistence
# Usage: ./create-volume.sh

VOLUME_NAME="photos-volume"
VOLUME_SIZE=24  # Size in MB

echo "🗄️  Creating Unikraft Cloud volume for PostgreSQL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Volume configuration:"
echo "  📦 Name: $VOLUME_NAME"
echo "  💾 Size: ${VOLUME_SIZE}MB"
echo ""

# Check if volume already exists
echo "🔍 Checking if volume already exists..."
if kraft cloud volume list | grep -q "$VOLUME_NAME"; then
  echo "⚠️  Volume '$VOLUME_NAME' already exists"
  echo ""
  echo "Volume details:"
  kraft cloud volume get "$VOLUME_NAME"
  echo ""
  echo "💡 To delete and recreate: kraft cloud volume delete $VOLUME_NAME"
  exit 0
fi

# Create the volume
echo "📦 Creating volume..."
kraft cloud volume create --name "$VOLUME_NAME" --size "$VOLUME_SIZE"

if [ $? -ne 0 ]; then
  echo "❌ Volume creation failed"
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Volume created successfully!"
echo ""
echo "Volume details:"
kraft cloud volume get "$VOLUME_NAME"
echo ""
echo "💡 Next steps:"
echo "   1. Deploy PostgreSQL: ./postgres/deploy-postgres.sh"
echo "   2. Check volume status: kraft cloud volume list"

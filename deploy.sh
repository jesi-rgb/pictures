#!/bin/bash
set -e

# Deploy to Unikraft Cloud
# Usage: ./deploy.sh

echo "🚀 Deploying to Unikraft Cloud"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if .env.production exists
if [ ! -f .env.production ]; then
  echo "❌ .env.production not found"
  echo "💡 Copy .env.production.example and fill in your values:"
  echo "   cp .env.production.example .env.production"
  exit 1
fi

# Load environment variables
export $(cat .env.production | grep -v '^#' | xargs)

# Check required environment variables
required_vars=("DATABASE_URI" "PAYLOAD_SECRET" "CLOUDFLARE_ACCOUNT_ID" "CLOUDFLARE_ACCESS_KEY_ID" "CLOUDFLARE_SECRET_ACCESS_KEY" "CLOUDFLARE_BUCKET" "CLOUDFLARE_PUBLIC_URL")
missing_vars=()

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    missing_vars+=("$var")
  fi
done

if [ ${#missing_vars[@]} -gt 0 ]; then
  echo "❌ Missing required environment variables:"
  printf '   - %s\n' "${missing_vars[@]}"
  exit 1
fi

echo "✅ Environment variables validated"
echo "   📦 Bucket: $CLOUDFLARE_BUCKET"
echo "   🌐 Public URL: $CLOUDFLARE_PUBLIC_URL"
echo ""

# Build the application
echo "📦 Building application..."
pnpm build

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy to Unikraft Cloud
echo "☁️  Deploying to Unikraft Cloud (Frankfurt)..."
echo ""

kraft cloud deploy \
  --metro fra \
  --env DATABASE_URI="$DATABASE_URI" \
  --env PAYLOAD_SECRET="$PAYLOAD_SECRET" \
  --env CLOUDFLARE_ACCOUNT_ID="$CLOUDFLARE_ACCOUNT_ID" \
  --env CLOUDFLARE_ACCESS_KEY_ID="$CLOUDFLARE_ACCESS_KEY_ID" \
  --env CLOUDFLARE_SECRET_ACCESS_KEY="$CLOUDFLARE_SECRET_ACCESS_KEY" \
  --env CLOUDFLARE_BUCKET="$CLOUDFLARE_BUCKET" \
  --env CLOUDFLARE_PUBLIC_URL="$CLOUDFLARE_PUBLIC_URL" \
  --env NODE_ENV="production" \
  --env PORT="3000"

if [ $? -ne 0 ]; then
  echo "❌ Deployment failed"
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment successful!"
echo ""
echo "💡 Next steps:"
echo "   1. Check deployment status: kraft cloud instance list"
echo "   2. View logs: kraft cloud instance logs paytest"
echo "   3. Get URL: kraft cloud instance get paytest"

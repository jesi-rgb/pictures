# Deployment Guide: Unikraft Cloud + Cloudflare R2

This guide covers deploying your Payload CMS application to Unikraft Cloud with Cloudflare R2 storage for images.

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│         Unikraft Cloud (Frankfurt)          │
│  ┌───────────────────────────────────────┐  │
│  │   Your Payload CMS App (Next.js 15)   │  │
│  └─────────────┬──────────────┬──────────┘  │
│                │              │              │
└────────────────┼──────────────┼──────────────┘
                 │              │
        ┌────────▼────┐    ┌────▼──────────────┐
        │  PostgreSQL │    │  Cloudflare R2    │
        │   Database  │    │  (jesirgb-pictures)│
        │  (Unikraft) │    │                   │
        └─────────────┘    │  - /media/...     │
                           │  - /photos/...    │
                           └───────────────────┘
```

## Prerequisites

### Required Accounts & Tools

1. **Unikraft Cloud Account**
   - Sign up at https://unikraft.cloud
   - Install kraftkit: https://unikraft.org/docs/cli

2. **Cloudflare Account**
   - R2 bucket `jesirgb-pictures` already set up
   - API tokens configured (see R2_SETUP.md)

3. **Local Tools**
   - Node.js 20+ and pnpm
   - PostgreSQL client tools (`pg_dump`, `psql`)
   - `kraft` CLI (should be in your PATH)

### Verify Prerequisites

```bash
# Check kraft CLI
kraft version

# Check PostgreSQL tools
pg_dump --version
psql --version

# Check Node and pnpm
node --version  # Should be 20+
pnpm --version  # Should be 9 or 10
```

## Step 1: Set Up Unikraft PostgreSQL Database

Create a PostgreSQL database service in Unikraft Cloud:

```bash
kraft cloud service create \
  --name paytest-postgres \
  --type postgres:16 \
  --metro fra \
  --password <YOUR_SECURE_PASSWORD>
```

Get the connection string:

```bash
kraft cloud service get paytest-postgres
```

You'll get something like:

```
postgresql://postgres:YOUR_PASSWORD@postgres-abc123.internal:5432/postgres
```

**Save this connection string!** You'll need it for `.env.production`.

## Step 2: Configure Production Environment

Copy the template and fill in your values:

```bash
cp .env.production.example .env.production
```

Edit `.env.production` and fill in:

```bash
# Database (from Step 1)
DATABASE_URI=postgresql://postgres:YOUR_PASSWORD@postgres-abc123.internal:5432/postgres

# Payload Secret (generate with: openssl rand -base64 32)
PAYLOAD_SECRET=your-long-random-secret-here

# Cloudflare R2 (from R2 dashboard)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY_ID=your-r2-access-key
CLOUDFLARE_SECRET_ACCESS_KEY=your-r2-secret-key
CLOUDFLARE_BUCKET=jesirgb-pictures
CLOUDFLARE_PUBLIC_URL=https://pub-xxxxx.r2.dev

# Next.js
NODE_ENV=production
PORT=3000
```

### Getting Cloudflare Credentials

1. Go to Cloudflare Dashboard → R2
2. Click "Manage R2 API Tokens"
3. Create token with "Object Read & Write" permissions
4. Copy Account ID, Access Key ID, and Secret Access Key
5. Get Public URL from your bucket settings

## Step 3: Migrate Data to Production

### Option A: Automated Migration (Recommended)

Run the complete migration script:

```bash
pnpm run migrate:prod
```

This will:

1. Dump your local database
2. Restore it to Unikraft PostgreSQL
3. Upload all images to R2
4. Validate the migration

### Option B: Manual Migration (Step by Step)

#### 3.1 Dump Local Database

```bash
pnpm run db:dump
```

This creates `backup-YYYY-MM-DD.sql` in your project root.

#### 3.2 Restore to Production

```bash
pnpm run db:restore
```

This uploads the dump to your Unikraft PostgreSQL database.

#### 3.3 Upload Images to R2

```bash
pnpm run sync:r2
```

This uploads files from:

- `/media` → `jesirgb-pictures/media/`
- `/photos` → `jesirgb-pictures/photos/`

#### 3.4 Validate

```bash
pnpm run validate:prod
```

Checks:

- ✅ Environment variables
- ✅ Database connection
- ✅ R2 bucket access

## Step 4: Deploy to Unikraft Cloud

### First Time Deployment

```bash
./deploy.sh
```

This script:

1. Validates environment variables
2. Builds your Next.js app
3. Deploys to Unikraft Cloud (Frankfurt)
4. Sets all environment variables
5. Shows deployment status

### Check Deployment Status

```bash
# List instances
kraft cloud instance list

# View logs
kraft cloud instance logs paytest

# Get instance details and URL
kraft cloud instance get paytest
```

### Access Your Application

After deployment, get your URL:

```bash
kraft cloud instance get paytest | grep URL
```

Visit the URL to access your Payload CMS!

## Step 5: Post-Deployment

### 1. Test the Application

- Visit admin panel: `https://your-app-url/admin`
- Log in with your credentials
- Upload a test image
- Verify it appears in Cloudflare R2

### 2. Set Up Custom Domain (Optional)

```bash
kraft cloud domain add your-domain.com --instance paytest
```

### 3. Enable R2 Custom Domain (Optional)

In Cloudflare Dashboard:

1. Go to R2 → Your Bucket → Settings
2. Add custom domain (e.g., `cdn.yourdomain.com`)
3. Update `.env.production`:
   ```bash
   CLOUDFLARE_PUBLIC_URL=https://cdn.yourdomain.com
   ```
4. Redeploy: `./deploy.sh`

## Troubleshooting

### Build Failures

**Error: Build failed**

```bash
# Clean build and try again
rm -rf .next
pnpm build
```

### Database Connection Issues

**Error: Can't connect to database**

Check your DATABASE_URI:

```bash
# Test connection
psql "$DATABASE_URI" -c "SELECT NOW();"
```

Make sure:

- Password is correct
- Using `.internal` hostname (for Unikraft internal networking)
- Port is 5432

### R2 Upload Failures

**Error: Access Denied**

Verify R2 credentials:

```bash
pnpm run validate:prod
```

Check:

- API token has "Object Read & Write" permissions
- Bucket name is exact: `jesirgb-pictures`
- Account ID matches your Cloudflare account

### Images Not Loading

**Issue: Images show broken**

1. Check R2 public URL in `.env.production`
2. Verify bucket is public:
   - Cloudflare Dashboard → R2 → Your Bucket → Settings
   - Enable "Public Access"
3. Check file paths in R2:
   ```
   jesirgb-pictures/
   ├── photos/IMG_2971.JPG  ✅ Correct
   └── IMG_2971.JPG         ❌ Wrong (missing photos/ prefix)
   ```

### Deployment Hangs

**Issue: kraft cloud deploy hangs**

```bash
# Cancel and check instance status
kraft cloud instance list

# If exists, delete and redeploy
kraft cloud instance delete paytest
./deploy.sh
```

## Updating Your Deployment

### Deploy Code Changes

```bash
./deploy.sh
```

### Update Environment Variables

```bash
# Edit .env.production
nano .env.production

# Redeploy
./deploy.sh
```

### Database Schema Changes

After modifying collections:

```bash
# Generate new types
pnpm generate:types

# Deploy (Payload will auto-migrate schema)
./deploy.sh
```

## Monitoring & Maintenance

### View Logs

```bash
# Real-time logs
kraft cloud instance logs paytest --follow

# Last 100 lines
kraft cloud instance logs paytest --tail 100
```

### Scale Instance

```bash
# Update memory/CPU (if needed)
kraft cloud instance update paytest --memory 2048
```

### Backup Database

```bash
# Connect to local with production DB
export DATABASE_URI="your-production-uri"
pnpm run db:dump
```

Creates timestamped backup file locally.

### Monitor R2 Usage

Check Cloudflare Dashboard → R2 → Analytics

- Storage used
- Requests per day
- Bandwidth

## Cost Estimation

### Unikraft Cloud

- App instance: ~$5-15/month (depending on traffic)
- PostgreSQL: ~$10-20/month (250MB database)
- **Total: ~$15-35/month**

### Cloudflare R2

- Storage: $0.015/GB/month
- Class A ops (writes): $4.50 per million
- Class B ops (reads): $0.36 per million
- **Estimated with 38 photos: <$1/month**

### Overall: ~$20-40/month

## Next Steps

- [ ] Set up automated backups
- [ ] Configure monitoring/alerts
- [ ] Add custom domain
- [ ] Set up CDN for R2 (optional)
- [ ] Configure WAF rules (optional)

## Support & Resources

- **Unikraft Docs**: https://unikraft.org/docs
- **Payload CMS Docs**: https://payloadcms.com/docs
- **Cloudflare R2 Docs**: https://developers.cloudflare.com/r2/

Need help? Check the project's README or open an issue.

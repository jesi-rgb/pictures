# Cloudflare R2 Setup Guide

Your photos are already uploaded to the R2 bucket `jesirgb-pictures`. This guide will help you configure Payload CMS to use them.

## Step 1: Configure Environment Variables

Add these variables to your `.env.production` file:

```bash
# Cloudflare R2 Storage
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY_ID=your-r2-access-key
CLOUDFLARE_SECRET_ACCESS_KEY=your-r2-secret-key
CLOUDFLARE_BUCKET=jesirgb-pictures
CLOUDFLARE_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

### How to get these values:

1. **CLOUDFLARE_ACCOUNT_ID**:
   - Go to Cloudflare Dashboard
   - It's shown in the URL: `https://dash.cloudflare.com/{ACCOUNT_ID}`

2. **CLOUDFLARE_ACCESS_KEY_ID & CLOUDFLARE_SECRET_ACCESS_KEY**:
   - Go to R2 in Cloudflare Dashboard
   - Click "Manage R2 API Tokens"
   - Create a new API token with "Object Read & Write" permissions
   - Copy the Access Key ID and Secret Access Key

3. **CLOUDFLARE_PUBLIC_URL**:
   - Go to your R2 bucket settings
   - Enable "Public Access" on the bucket
   - Copy the public bucket URL (usually `https://pub-xxxxx.r2.dev`)
   - OR set up a custom domain (recommended for production)

## Step 2: Verify File Structure in R2

Your files should be organized in R2 with this structure:

```
jesirgb-pictures/
├── photos/
│   ├── IMG_2971.JPG
│   ├── IMG_3215.JPG
│   ├── IMG_3233.JPG
│   └── ... (all other photos)
└── media/
    └── (other media files)
```

If your files are currently at the root level, you need to move them into a `photos/` folder in R2.

## Step 3: Update Database Records

The Payload config is already set up to use R2 in production. When `NODE_ENV=production`, it will:

1. Store new uploads in R2 under the `photos/` prefix
2. Generate URLs using `CLOUDFLARE_PUBLIC_URL`
3. Serve images from R2 instead of local storage

For existing photos in the database, they will automatically use R2 URLs when you deploy to production, as long as:

- The `filename` field matches the file in R2
- The files are in the `photos/` folder in R2

## Step 4: Test Configuration

To test if everything is working:

1. Deploy to production with the env vars set
2. Check the admin panel - photo URLs should point to R2
3. Verify images load correctly from the R2 public URL

## File Organization

Since you already have files in R2, ensure they're organized correctly:

### Current database filenames:

- IMG_2971.JPG
- IMG_3215.JPG
- IMG_3233.JPG
- ... (38 total)

### Required R2 path:

```
https://pub-xxxxx.r2.dev/photos/IMG_2971.JPG
```

If your files are at:

```
https://pub-xxxxx.r2.dev/IMG_2971.JPG  (❌ Wrong - missing 'photos/' prefix)
```

You need to move them to include the `photos/` prefix.

## Moving Files in R2

If files are not in the `photos/` folder, you can:

1. Use Cloudflare R2 Dashboard UI to move files
2. Use `wrangler` CLI:

   ```bash
   # Install wrangler
   npm install -g wrangler

   # Login to Cloudflare
   wrangler login

   # Move files (this would need to be scripted for all files)
   # Or use the R2 dashboard to create a photos folder and move files
   ```

## Production Deployment

Once configured, deploy to production:

```bash
pnpm build
# Deploy using your method (Unikraft Cloud, Docker, etc.)
```

The application will automatically use R2 for photos when `NODE_ENV=production`.

# Payload CMS - Photography Portfolio

A Payload CMS application configured for photography portfolio management with PostgreSQL, Cloudflare R2 storage, and Unikraft Cloud deployment.

## Features

- **Collections**: Photos, Media, Blog, Categories, Users
- **Upload Management**: Image resizing, EXIF data extraction
- **Cloud Storage**: Cloudflare R2 for production images
- **Database**: PostgreSQL with full-text search
- **Deployment**: Optimized for Unikraft Cloud

## Quick Start - Local Development

To run this project locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. **Clone the repository** (if you haven't already)

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your local PostgreSQL connection string.

3. **Install dependencies:**

   ```bash
   pnpm install
   ```

4. **Start PostgreSQL** (using Docker):

   ```bash
   docker-compose up -d
   ```

5. **Run development server:**

   ```bash
   pnpm dev
   ```

6. **Open your browser:**
   ```
   http://localhost:3000
   ```

Follow the on-screen instructions to create your first admin user.

### Available Scripts

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server

# Database
pnpm db:dump      # Dump local database
pnpm db:restore   # Restore database to production

# Cloudflare R2
pnpm sync:r2      # Upload images to R2

# Deployment
pnpm migrate:prod # Complete migration to production
pnpm validate:prod # Validate production setup
./deploy.sh       # Deploy to Unikraft Cloud

# Utilities
pnpm generate:types  # Generate TypeScript types
pnpm sync-photos     # Sync photos from /photos directory
```

## Collections

### Photos

- Upload-enabled with EXIF data extraction
- Auto-generates multiple image sizes (thumbnail, card, tablet, desktop, fullsize)
- Stores camera settings, GPS coordinates, date taken
- Local storage in dev, R2 in production

### Media

- General media uploads
- Multiple image sizes
- Local storage in dev, R2 in production

### Blog

- Blog post management
- Rich text editor (Lexical)
- Category support

### Categories

- Organize blog posts and content

### Users

- Authentication enabled
- Admin panel access

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3
- **Database**: PostgreSQL 16
- **Storage**: Cloudflare R2 (production)
- **Deployment**: Unikraft Cloud
- **Styling**: Tailwind CSS + DaisyUI

## 🚀 Production Deployment

Deploy to Unikraft Cloud with Cloudflare R2 storage:

### Quick Deployment

```bash
# 1. Set up environment
cp .env.production.example .env.production
# Edit .env.production with your credentials

# 2. Migrate data
pnpm run migrate:prod

# 3. Deploy
./deploy.sh
```

### Detailed Instructions

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete deployment guide including:

- Setting up Unikraft Cloud PostgreSQL
- Configuring Cloudflare R2
- Database migration
- Image upload to R2
- Troubleshooting

### Environment Variables

#### Development (.env)

```bash
DATABASE_URI=postgresql://postgres:password@localhost:5432/payloadcms
PAYLOAD_SECRET=your-secret-here
PORT=3000
```

#### Production (.env.production)

```bash
DATABASE_URI=postgresql://postgres:PASSWORD@postgres-XXX.internal:5432/payloadcms
PAYLOAD_SECRET=your-production-secret
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY_ID=your-r2-access-key
CLOUDFLARE_SECRET_ACCESS_KEY=your-r2-secret-key
CLOUDFLARE_BUCKET=jesirgb-pictures
CLOUDFLARE_PUBLIC_URL=https://pub-xxxxx.r2.dev
NODE_ENV=production
PORT=3000
```

## Documentation

- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Complete deployment guide
- [R2_SETUP.md](R2_SETUP.md) - Cloudflare R2 configuration
- [AGENTS.md](AGENTS.md) - Development guidelines

## Architecture

```
Development (Local)
├── Next.js App (localhost:3000)
├── PostgreSQL (Docker)
└── Local File Storage (/media, /photos)

Production (Unikraft Cloud)
├── Next.js App (Unikraft)
├── PostgreSQL (Unikraft)
└── Cloudflare R2 (jesirgb-pictures)
    ├── /media/
    └── /photos/
```

## Contributing

1. Follow code style in [AGENTS.md](AGENTS.md)
2. Use Prettier (single quotes, no semicolons)
3. Generate types after schema changes: `pnpm generate:types`
4. Test locally before deploying

## License

MIT

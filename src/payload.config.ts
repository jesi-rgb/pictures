import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Photos } from './collections/Photos'
import { Categories } from './collections/Categories'
import { Blog } from './collections/Blog'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Photos, Categories, Blog],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 50000000, // 50MB
    },
  },
  plugins: [
    // Only use R2 storage in production
    ...(process.env.NODE_ENV === 'production'
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'media',
                generateFileURL: ({ filename, prefix }) => {
                  return `${process.env.CLOUDFLARE_PUBLIC_URL}/${prefix}/${filename}`
                },
              },
              photos: {
                prefix: 'photos',
                generateFileURL: ({ filename, prefix }) => {
                  return `${process.env.CLOUDFLARE_PUBLIC_URL}/${prefix}/${filename}`
                },
              },
            },
            bucket: process.env.CLOUDFLARE_BUCKET || '',
            config: {
              endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
              credentials: {
                accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY || '',
              },
              region: 'auto',
            },
          }),
        ]
      : []),
  ],
})

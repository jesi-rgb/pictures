import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // Disable local storage in production (R2 will be used via plugin)
    disableLocalStorage: process.env.NODE_ENV === 'production',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // height: undefined, // Maintain aspect ratio
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        // height: undefined, // Maintain aspect ratio
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
}

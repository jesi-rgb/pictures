import type { CollectionConfig } from 'payload'
import exifr from 'exifr'

export const Photos: CollectionConfig = {
  slug: 'photos',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
    // Camera settings
    {
      name: 'iso',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'ISO speed rating',
      },
    },
    {
      name: 'shutterSpeed',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Shutter speed (e.g., 1/250)',
      },
    },
    {
      name: 'aperture',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Aperture (e.g., f/2.8)',
      },
    },
    {
      name: 'focalLength',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Focal length in mm',
      },
    },
    // Camera info
    {
      name: 'camera',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Camera make and model',
      },
    },
    {
      name: 'lens',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Lens model',
      },
    },
    // Date and time
    {
      name: 'dateTaken',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Date and time the photo was taken',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    // Location
    {
      name: 'latitude',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'GPS latitude',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'GPS longitude',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Location name (manually added)',
      },
    },
    // Additional metadata
    {
      name: 'whiteBalance',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'flash',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Only process if there's a file being uploaded
        if (req.file) {
          try {
            // Parse EXIF data from the uploaded file
            const exifData = await exifr.parse(req.file.data, {
              tiff: true,
              exif: true,
              gps: true,
              interop: true,
            })

            if (exifData) {
              // ISO
              if (exifData.ISO) {
                data.iso = exifData.ISO
              }

              // Shutter Speed
              if (exifData.ExposureTime) {
                const exposureTime = exifData.ExposureTime
                if (exposureTime < 1) {
                  data.shutterSpeed = `1/${Math.round(1 / exposureTime)}`
                } else {
                  data.shutterSpeed = `${exposureTime}s`
                }
              }

              // Aperture
              if (exifData.FNumber) {
                data.aperture = `f/${exifData.FNumber.toFixed(1)}`
              }

              // Focal Length
              if (exifData.FocalLength) {
                data.focalLength = Math.round(exifData.FocalLength)
              }

              // Camera
              if (exifData.Make && exifData.Model) {
                data.camera = `${exifData.Make} ${exifData.Model}`.trim()
              } else if (exifData.Model) {
                data.camera = exifData.Model
              }

              // Lens
              if (exifData.LensModel) {
                data.lens = exifData.LensModel
              }

              // Date taken
              if (exifData.DateTimeOriginal) {
                data.dateTaken = exifData.DateTimeOriginal.toISOString()
              } else if (exifData.DateTime) {
                data.dateTaken = exifData.DateTime.toISOString()
              }

              // GPS coordinates
              if (exifData.latitude && exifData.longitude) {
                data.latitude = exifData.latitude
                data.longitude = exifData.longitude
              }

              // White Balance
              if (exifData.WhiteBalance !== undefined) {
                const wbModes = ['Auto', 'Manual']
                data.whiteBalance = wbModes[exifData.WhiteBalance] || 'Unknown'
              }

              // Flash
              if (exifData.Flash !== undefined) {
                data.flash = exifData.Flash & 1 ? 'Fired' : 'Did not fire'
              }
            }
          } catch (error) {
            // If EXIF parsing fails, log but don't prevent upload
            console.error('Error parsing EXIF data:', error)
          }
        }

        return data
      },
    ],
  },
  upload: {
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
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        position: 'centre',
      },
      {
        name: 'fullsize',
        width: 3840,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*'],
  },
}

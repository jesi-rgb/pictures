import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import { ZoomableImage } from '@/components/ZoomableImage'

export default async function PhotoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const photo = await payload.findByID({
    collection: 'photos',
    id,
  })

  if (!photo) {
    notFound()
  }

  const imageUrl = typeof photo.url === 'string' ? photo.url : ''
  const alt = typeof photo.alt === 'string' ? photo.alt : 'Photo'

  // Metadata items to display
  const metadataItems = [
    { label: 'Camera', value: photo.camera },
    { label: 'Lens', value: photo.lens },
    { label: 'Aperture', value: photo.aperture },
    { label: 'Shutter Speed', value: photo.shutterSpeed },
    { label: 'ISO', value: photo.iso },
    { label: 'Focal Length', value: photo.focalLength ? `${photo.focalLength}mm` : null },
    {
      label: 'Date Taken',
      value: photo.dateTaken ? new Date(photo.dateTaken).toLocaleString() : null,
    },
  ].filter((item) => item.value !== null && item.value !== undefined)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/photos" className="btn btn-ghost btn-sm">
          ← Back to Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left side - Image */}
        <div className="relative lg:min-h-[80vh]">
          {imageUrl && <ZoomableImage src={imageUrl} alt={alt} />}
        </div>

        {/* Right side - Metadata */}
        <div className="flex flex-col">
          <div>
            <h1 className="text-3xl font-bold">{photo.caption}</h1>
          </div>

          <div className="divider"></div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {metadataItems.map((item, index) => (
                <div key={index} className="">
                  <dt className="text-xs font-semibold text-muted font-mono">{item.label}</dt>
                  <dd className="font-medium">{item.value}</dd>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

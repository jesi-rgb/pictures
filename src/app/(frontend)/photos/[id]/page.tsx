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
    <div className="lg:fixed lg:inset-0">
      {/* Desktop layout: side by side */}
      <div className="hidden lg:flex h-full">
        {/* Full-screen image container */}
        <div className="flex-1 relative max-w-3xl h-screen">
          {imageUrl && <ZoomableImage src={imageUrl} alt={alt} />}
        </div>

        {/* Metadata sidebar */}
        <div className="bg-base-100 p-8 overflow-y-auto w-2/4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{photo.caption || alt}</h1>
          </div>

          <div className="divider"></div>

          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2">
            {metadataItems.map((item, index) => (
              <div key={index}>
                <dt className="text-xs font-semibold text-muted font-mono uppercase">
                  {item.label}
                </dt>
                <dd className="font-medium mt-1">{item.value}</dd>
              </div>
            ))}
          </div>

          <Link
            href="/photos"
            className="btn backdrop-blur-sm self-end mt-6"
          >
            ← Back to Gallery
          </Link>
        </div>
      </div>

      {/* Mobile layout: image full screen on top, metadata below */}
      <div className="lg:hidden">
        {/* Full viewport height image - absolute positioning to break out of any container */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[70svh]">
          {imageUrl && <ZoomableImage src={imageUrl} alt={alt} />}
        </div>

        {/* Metadata section below - no gap between image and stats */}
        <div className="bg-base-100 px-4 py-6 flex flex-col gap-10">
          {photo.caption && (
            <>
              <h1 className="text-xl font-bold">{photo.caption}</h1>
            </>
          )}

          <div className="space-y-3">
            {metadataItems.map((item, index) => (
              <div key={index}>
                <dt className="text-xs font-semibold text-muted font-mono uppercase">
                  {item.label}
                </dt>
                <dd className="font-medium mt-1">{item.value}</dd>
              </div>
            ))}
          </div>


          <Link href="/photos" className="btn btn-ghost btn-sm self-end">
            ← Back to Gallery
          </Link>

        </div>
      </div>
    </div>
  )
}

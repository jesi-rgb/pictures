import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import config from '@/payload.config'

export default async function PhotosPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: photos } = await payload.find({
    collection: 'photos',
    limit: 100,
    sort: '-dateTaken',
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="btn btn-ghost btn-sm">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8">Photo Gallery</h1>

      {photos.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted">
            No photos yet. Upload some photos in the admin panel!
          </p>
          <a href="/admin" className="btn btn-primary mt-4">
            Go to Admin
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => {
            const imageUrl = typeof photo.url === 'string' ? photo.url : ''
            const alt = typeof photo.alt === 'string' ? photo.alt : 'Photo'

            return (
              <Link
                key={photo.id}
                href={`/photos/${photo.id}`}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
              >
                <figure className="relative aspect-square">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-sm">{alt}</h2>
                  {photo.camera && <p className="text-xs text-muted">{photo.camera}</p>}
                  {(photo.aperture || photo.shutterSpeed || photo.iso) && (
                    <div className="flex gap-2 text-xs text-subtle">
                      {photo.aperture && <span>{photo.aperture}</span>}
                      {photo.shutterSpeed && <span>{photo.shutterSpeed}</span>}
                      {photo.iso && <span>ISO {photo.iso}</span>}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

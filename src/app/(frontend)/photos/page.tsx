import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import config from '@/payload.config'
import './photos.css'

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
        <div className="masonry-grid">
          {photos.map((photo) => {
            const imageUrl = typeof photo.url === 'string' ? photo.url : ''
            const alt = typeof photo.alt === 'string' ? photo.alt : 'Photo'

            return (
              <div key={photo.id} className="masonry-item mb-3">
                <Link href={`/photos/${photo.id}`}>
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={alt}
                      width={photo.width || 400}
                      height={photo.height || 400}
                      className="h-auto w-full transform cursor-pointer shadow-md transition-transform hover:scale-102"
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

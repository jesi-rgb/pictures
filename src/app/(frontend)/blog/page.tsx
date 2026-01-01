import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogListPage() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'blog',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    limit: 20,
    depth: 2,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-error">No blog posts found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const featuredImage =
              post.featuredImage &&
              typeof post.featuredImage !== 'string' &&
              typeof post.featuredImage !== 'number'
                ? post.featuredImage
                : null

            const category =
              post.category &&
              typeof post.category !== 'string' &&
              typeof post.category !== 'number'
                ? post.category
                : null

            const author =
              post.author && typeof post.author !== 'string' && typeof post.author !== 'number'
                ? post.author
                : null

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                {featuredImage && (
                  <figure>
                    <img
                      src={featuredImage.sizes?.thumbnail?.url || featuredImage.url || ''}
                      alt={featuredImage.alt}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                )}
                <div className="card-body">
                  {category && <div className="badge badge-secondary mb-2">{category.name}</div>}
                  <h2 className="card-title">{post.title}</h2>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="text-xs text-gray-500">
                      {author && <span>By {author.name}</span>}
                      {post.publishedDate && (
                        <span className="ml-2">
                          {new Date(post.publishedDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {post.featured && <div className="badge badge-accent">Featured</div>}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

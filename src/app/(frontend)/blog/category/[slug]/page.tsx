import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // Find the category
  const { docs: categories } = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const category = categories[0]

  if (!category) {
    notFound()
  }

  // Find posts in this category
  const { docs: posts } = await payload.find({
    collection: 'blog',
    where: {
      category: {
        equals: category.id,
      },
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
    depth: 2,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>{category.name}</li>
        </ul>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
        {category.description && <p className="text-gray-600">{category.description}</p>}
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-gray-600">No blog posts found in this category.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const featuredImage =
              post.featuredImage &&
              typeof post.featuredImage !== 'string' &&
              typeof post.featuredImage !== 'number'
                ? post.featuredImage
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
                    <img src={featuredImage.url || ''} alt={featuredImage.alt} className="w-full" />
                  </figure>
                )}
                <div className="card-body">
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

import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '@/components/RichText'

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'blog',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  const post = posts[0]

  if (!post) {
    notFound()
  }

  const featuredImage =
    post.featuredImage &&
    typeof post.featuredImage !== 'string' &&
    typeof post.featuredImage !== 'number'
      ? post.featuredImage
      : null

  const category =
    post.category && typeof post.category !== 'string' && typeof post.category !== 'number'
      ? post.category
      : null

  const author =
    post.author && typeof post.author !== 'string' && typeof post.author !== 'number'
      ? post.author
      : null

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>{post.title}</li>
        </ul>
      </div>

      {/* Category Badge */}
      {category && (
        <Link href={`/blog/category/${category.slug}`} className="badge badge-secondary mb-4">
          {category.name}
        </Link>
      )}

      {/* Title */}
      <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

      {/* Meta Info */}
      <div className="flex gap-4 text-sm text-gray-600 mb-8">
        {author && <span>By {author.name}</span>}
        {post.publishedDate && (
          <span>
            {new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        )}
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <figure className="mb-8">
          <img
            src={featuredImage.url || ''}
            alt={featuredImage.alt}
            className="w-full rounded-lg"
          />
        </figure>
      )}

      {/* Excerpt */}
      <div className="text-xl text-gray-700 mb-8 italic">{post.excerpt}</div>

      {/* Content Blocks */}
      <div className="max-w-none">
        {post.content &&
          post.content.map((block, index) => {
            switch (block.blockType) {
              case 'richText':
                return (
                  <div key={block.id || index} className="mb-6">
                    <RichText content={block.content as any} />
                  </div>
                )

              case 'imageBlock': {
                const image =
                  block.image && typeof block.image !== 'string' && typeof block.image !== 'number'
                    ? block.image
                    : null
                const sizeClasses = {
                  small: 'max-w-md',
                  medium: 'max-w-2xl',
                  large: 'max-w-4xl',
                  full: 'w-full',
                }
                return (
                  <figure
                    key={block.id || index}
                    className={`my-8 ${sizeClasses[block.size || 'medium']} mx-auto`}
                  >
                    {image && (
                      <>
                        <img src={image.url || ''} alt={image.alt} className="rounded-lg" />
                        {block.caption && (
                          <figcaption className="text-center text-sm text-gray-600 mt-2">
                            {block.caption}
                          </figcaption>
                        )}
                      </>
                    )}
                  </figure>
                )
              }

              case 'quote': {
                const styleClasses = {
                  default: 'border-l-4 border-gray-300 pl-6 italic',
                  highlighted: 'bg-yellow-50 border-l-4 border-yellow-400 p-6 italic',
                  minimal: 'text-center italic text-gray-600',
                }
                return (
                  <blockquote
                    key={block.id || index}
                    className={`my-8 ${styleClasses[block.style || 'default']}`}
                  >
                    <p className="text-xl">{block.text}</p>
                    {block.author && (
                      <cite className="block mt-2 text-sm not-italic">— {block.author}</cite>
                    )}
                  </blockquote>
                )
              }

              case 'codeBlock':
                return (
                  <div key={block.id || index} className="my-8">
                    {block.filename && (
                      <div className="bg-gray-800 text-white px-4 py-2 rounded-t-lg text-sm">
                        {block.filename}
                      </div>
                    )}
                    <pre className="bg-gray-900 text-white p-4 rounded-b-lg overflow-x-auto">
                      <code className={`language-${block.language || 'text'}`}>{block.code}</code>
                    </pre>
                  </div>
                )

              case 'videoEmbed':
                return (
                  <div key={block.id || index} className="my-8">
                    <div className="aspect-video">
                      <iframe
                        src={block.url || ''}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                      />
                    </div>
                    {block.caption && (
                      <p className="text-center text-sm text-gray-600 mt-2">{block.caption}</p>
                    )}
                  </div>
                )

              case 'callToAction': {
                const styleClasses = {
                  primary: 'btn-primary',
                  secondary: 'btn-secondary',
                  accent: 'btn-accent',
                }
                return (
                  <div
                    key={block.id || index}
                    className="my-8 p-8 bg-base-200 rounded-lg text-center"
                  >
                    <h3 className="text-2xl font-bold mb-2">{block.heading}</h3>
                    {block.description && <p className="mb-4">{block.description}</p>}
                    <a
                      href={block.buttonLink || '#'}
                      className={`btn ${styleClasses[block.style || 'primary']}`}
                    >
                      {block.buttonText}
                    </a>
                  </div>
                )
              }

              case 'twoColumn':
                return (
                  <div key={block.id || index} className="my-8 grid md:grid-cols-2 gap-8">
                    <div>
                      <RichText content={block.leftColumn as any} />
                    </div>
                    <div>
                      <RichText content={block.rightColumn as any} />
                    </div>
                  </div>
                )

              default:
                return null
            }
          })}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-8">
          {post.tags.map((tagItem, index) => (
            <span key={index} className="badge badge-outline">
              {tagItem.tag}
            </span>
          ))}
        </div>
      )}

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {post.relatedPosts.map((relatedPost) => {
              if (typeof relatedPost === 'string' || typeof relatedPost === 'number') return null
              return (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="card bg-base-100 shadow hover:shadow-lg transition-shadow"
                >
                  <div className="card-body">
                    <h3 className="card-title text-lg">{relatedPost.title}</h3>
                    <p className="text-sm text-gray-600">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}

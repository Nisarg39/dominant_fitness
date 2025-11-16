import { MetadataRoute } from 'next'
import { getBlogs } from '@/server/actions/blogActions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]
  
  // Dynamic blog pages
  try {
    const blogsResult = await getBlogs(1, { status: 'published', limit: 1000 })
    const blogPages = blogsResult.success && blogsResult.data 
      ? blogsResult.data.map((blog: { slug: string; updatedAt?: string; publishDate?: string }) => ({
          url: `${baseUrl}/blogs/${blog.slug}`,
          lastModified: blog.updatedAt || blog.publishDate
            ? new Date(blog.updatedAt ?? blog.publishDate as string)
            : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      : []
    
    return [...staticPages, ...blogPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}

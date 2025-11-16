import { Metadata } from 'next';
import { getBlogBySlug } from '@/server/actions/blogActions';

/**
 * Generate dynamic metadata for individual blog pages
 * @param slug - Blog slug from URL
 * @returns Next.js Metadata object
 */
export async function generateBlogMetadata(slug: string): Promise<Metadata> {
  const result = await getBlogBySlug(slug);
  
  if (!result.success || !result.data) {
    return {
      title: 'Blog Not Found | DOMINATE Sport Performance',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  type Blog = {
    slug: string;
    title: string;
    excerpt?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    author?: string;
    status: 'published' | 'draft' | 'scheduled';
    publishDate?: string;
    updatedAt?: string;
    tags?: string[];
    category?: string;
    featuredImage?: { url?: string; altText?: string };
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: { url?: string };
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: { url?: string };
  };
  const blog = result.data as Blog; // Blog data from MongoDB
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  // Construct full URLs for images
  const featuredImageUrl = blog.featuredImage?.url || '';
  const ogImageUrl = blog.ogImage?.url || featuredImageUrl;
  const twitterImageUrl = blog.twitterImage?.url || featuredImageUrl;
  
  return {
    title: blog.title,
    description: blog.metaDescription || blog.excerpt || `Read ${blog.title} on DOMINATE Sport Performance blog`,
    keywords: blog.metaKeywords || [],
    authors: [{ name: blog.author || 'DOMINATE Performance' }],
    creator: blog.author || 'DOMINATE Performance',
    publisher: 'DOMINATE Sport Performance',
    openGraph: {
      title: blog.ogTitle || blog.title,
      description: blog.ogDescription || blog.metaDescription || blog.excerpt || '',
      images: ogImageUrl ? [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: blog.featuredImage?.altText || blog.title,
        },
      ] : [],
      type: 'article',
      publishedTime: blog.publishDate ? new Date(blog.publishDate).toISOString() : undefined,
      modifiedTime: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
      authors: [blog.author || 'DOMINATE Performance'],
      tags: blog.tags || [],
      section: blog.category || 'Sports Performance',
      locale: 'en_US',
      siteName: 'DOMINATE Sport Performance',
      url: `${baseUrl}/blogs/${blog.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.twitterTitle || blog.title,
      description: blog.twitterDescription || blog.metaDescription || blog.excerpt || '',
      images: twitterImageUrl ? [twitterImageUrl] : [],
      creator: '@dominateperformance', // Replace with actual Twitter handle
      site: '@dominateperformance',
    },
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
    robots: {
      index: blog.status === 'published',
      follow: blog.status === 'published',
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    category: blog.category || 'Sports Performance',
  };
}

/**
 * Generate metadata for blog list page
 * @param page - Current page number
 * @param category - Optional category filter
 * @returns Next.js Metadata object
 */
export function generateBlogListMetadata(page: number = 1, category?: string): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  const titleSuffix = category ? ` - ${category}` : '';
  const pageSuffix = page > 1 ? ` - Page ${page}` : '';
  
  const title = `Blog${titleSuffix}${pageSuffix} | DOMINATE Sport Performance`;
  const description = category 
    ? `${category} articles on sports performance training, athlete development, and evidence-based coaching.`
    : 'Expert insights on sports performance, training, nutrition, and athlete development. Evidence-based articles for athletes of all levels.';
  
  return {
    title,
    description,
    keywords: [
      'sports blog',
      'training tips',
      'athlete development',
      'performance coaching',
      'sports science',
      'strength training',
      'conditioning',
      'nutrition',
      category || '',
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${baseUrl}/blogs${page > 1 ? `?page=${page}` : ''}`,
      siteName: 'DOMINATE Sport Performance',
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@dominateperformance',
    },
    alternates: {
      canonical: `/blogs${page > 1 ? `?page=${page}` : ''}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

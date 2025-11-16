import { generateBlogPostingSchema, generateBreadcrumbSchema, calculateReadingTime, getWordCount } from '@/lib/seo/schema';

interface BlogJsonLdProps {
  blog: {
    slug: string;
    title: string;
    content: string;
    publishDate?: string;
    updatedAt?: string;
    author?: string;
    metaDescription?: string;
    excerpt?: string;
    metaKeywords?: string[];
    tags?: string[];
    category?: string;
    featuredImage?: { url?: string; altText?: string };
  };
}

export default function BlogJsonLd({ blog }: BlogJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  const blogPostingSchema = generateBlogPostingSchema({
    headline: blog.title,
    image: blog.featuredImage?.url || `${baseUrl}/images/og-image.jpg`,
    datePublished: blog.publishDate ? new Date(blog.publishDate).toISOString() : new Date().toISOString(),
    dateModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
    author: blog.author || 'DOMINATE Performance',
    publisher: {
      name: 'DOMINATE Sport Performance',
      logo: `${baseUrl}/logo.png`,
    },
    description: blog.metaDescription || blog.excerpt || '',
    url: `${baseUrl}/blogs/${blog.slug}`,
    keywords: blog.metaKeywords || blog.tags || [],
    articleSection: blog.category || 'Sports Performance',
    wordCount: getWordCount(blog.content),
    timeRequired: calculateReadingTime(blog.content),
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Blogs', url: `${baseUrl}/blogs` },
    { name: blog.title, url: `${baseUrl}/blogs/${blog.slug}` },
  ]);
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

// Schema.org helper functions for SEO

interface BlogPostingSchemaData {
  headline: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  publisher: {
    name: string;
    logo: string;
  };
  description: string;
  url: string;
  keywords: string[];
  articleSection: string;
  wordCount: number;
  timeRequired: string;
}

export function generateBlogPostingSchema(data: BlogPostingSchemaData) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.headline,
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': 'Person',
      name: data.author,
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: data.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: data.publisher.logo,
      },
    },
    description: data.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
    keywords: data.keywords.join(', '),
    articleSection: data.articleSection,
    wordCount: data.wordCount,
    timeRequired: data.timeRequired,
    inLanguage: 'en-US',
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Calculate reading time from HTML content
 * @param content - HTML content string
 * @returns ISO 8601 duration format (e.g., "PT7M" for 7 minutes)
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `PT${minutes}M`; // ISO 8601 duration format
}

/**
 * Get word count from HTML content
 * @param content - HTML content string
 * @returns Number of words
 */
export function getWordCount(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Calculate reading time in minutes for display
 * @param content - HTML content string
 * @returns Reading time in minutes
 */
export function getReadingTimeMinutes(content: string): number {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

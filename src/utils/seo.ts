import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  url = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'DOMINATE Performance',
  section,
  tags = []
}: SEOConfig): Metadata {
  const baseUrl = 'https://yourdomain.com' // Replace with your actual domain
  const fullUrl = `${baseUrl}${url}`
  const fullImageUrl = `${baseUrl}${image}`

  return {
    title: {
      default: title,
      template: '%s | DOMINATE Sport Performance'
    },
    description,
    keywords: [
      'sports performance',
      'athlete training',
      'strength and conditioning',
      'sports coaching',
      'fitness training',
      'athlete development',
      'performance testing',
      'sports science',
      'UKSCA certified',
      'elite performance',
      ...keywords
    ],
    authors: [{ name: author }],
    creator: author,
    publisher: 'DOMINATE Performance',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      siteName: 'DOMINATE Sport Performance',
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@dominateperformance', // Replace with your actual Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Common SEO configurations for different page types
export const seoConfigs = {
  home: {
    title: 'DOMINATE — Built for Sport Performance',
    description: 'Elite performance isn\'t a privilege — it\'s a process. Professional sports performance training and coaching for athletes of all levels. UKSCA certified coaching with evidence-based training methods.',
    keywords: ['sports performance training', 'elite athlete development', 'UKSCA certified coaching']
  },
  about: {
    title: 'About DOMINATE Performance',
    description: 'Learn about our mission to help Indian athletes reach their full potential through world-class, accessible sport science systems and evidence-based training methodologies.',
    keywords: ['about dominate performance', 'sports science mission', 'athlete development philosophy']
  },
  services: {
    title: 'Sports Performance Services',
    description: 'Comprehensive sports performance services including strength & conditioning, performance testing, athlete development, and sports science consulting.',
    keywords: ['sports performance services', 'strength conditioning', 'performance testing', 'athlete development programs']
  },
  contact: {
    title: 'Contact DOMINATE Performance',
    description: 'Get in touch with our UKSCA certified coaches for personalized sports performance training and consultation. Start your performance journey today.',
    keywords: ['contact dominate performance', 'sports coaching consultation', 'performance training inquiry']
  }
}

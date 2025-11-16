import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye } from 'lucide-react';
import { getReadingTimeMinutes } from '@/lib/seo/schema';

interface BlogCardProps {
  blog: {
    _id: string;
    slug: string;
    title: string;
    content?: string;
    excerpt?: string;
    category?: string;
    publishDate?: string;
    views?: number;
    featured?: boolean;
    featuredImage?: {
      url: string;
      altText?: string;
    };
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const readingTime = getReadingTimeMinutes(blog.content || '');
  const publishDate = blog.publishDate ? new Date(blog.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }) : '';
  
  return (
    <Link 
      href={`/blogs/${blog.slug}`}
      className="group glassmorphism-enhanced border border-red-500/20 rounded-xl overflow-hidden hover:border-red-500/40 transition-all duration-300 hover:scale-105 flex flex-col"
    >
      {/* Featured Image */}
      {blog.featuredImage?.url && (
        <div className="relative w-full h-48 overflow-hidden bg-gray-900">
          <Image
            src={blog.featuredImage.url}
            alt={blog.featuredImage.altText || blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {blog.featured && (
            <div className="absolute top-3 right-3 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              Featured
            </div>
          )}
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Category */}
        {blog.category && (
          <span className="inline-block px-3 py-1 bg-red-500/10 text-red-400 text-xs font-semibold rounded-full mb-3 w-fit">
            {blog.category}
          </span>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
          {blog.title}
        </h3>
        
        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
            {blog.excerpt}
          </p>
        )}
        
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto">
          {publishDate && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{publishDate}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readingTime} min read</span>
          </div>
          {blog.views !== undefined && (
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{blog.views} views</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

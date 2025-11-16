import { Calendar, Clock, User, Eye } from 'lucide-react';
import { getReadingTimeMinutes } from '@/lib/seo/schema';

interface BlogMetaProps {
  blog: {
    content?: string;
    publishDate?: string;
    author?: string;
    views?: number;
  };
}

export default function BlogMeta({ blog }: BlogMetaProps) {
  const readingTime = getReadingTimeMinutes(blog.content || '');
  const publishDate = blog.publishDate ? new Date(blog.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : '';
  
  return (
    <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-gray-800">
      {/* Author */}
      {blog.author && (
        <div className="flex items-center gap-2 text-gray-400">
          <User size={18} />
          <span className="text-sm">{blog.author}</span>
        </div>
      )}
      
      {/* Publish Date */}
      {publishDate && (
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={18} />
          <time dateTime={blog.publishDate} className="text-sm">
            {publishDate}
          </time>
        </div>
      )}
      
      {/* Reading Time */}
      <div className="flex items-center gap-2 text-gray-400">
        <Clock size={18} />
        <span className="text-sm">{readingTime} min read</span>
      </div>
      
      {/* Views */}
      {blog.views !== undefined && (
        <div className="flex items-center gap-2 text-gray-400">
          <Eye size={18} />
          <span className="text-sm">{blog.views} views</span>
        </div>
      )}
    </div>
  );
}

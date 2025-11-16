import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { getReadingTimeMinutes } from '@/lib/seo/schema';

interface RelatedPostsProps {
  posts: Array<{
    _id: string;
    slug: string;
    title: string;
    content?: string;
    excerpt?: string;
    category?: string;
    publishDate?: string;
    featuredImage?: { url: string; altText?: string };
  }>;
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;
  
  return (
    <div className="mt-20 pt-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const readingTime = getReadingTimeMinutes(post.content || '');
            const publishDate = post.publishDate ? new Date(post.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }) : '';
            
            return (
              <Link
                key={post._id}
                href={`/blogs/${post.slug}`}
                className="group glassmorphism-enhanced border border-red-500/20 rounded-xl overflow-hidden hover:border-red-500/40 transition-all duration-300 hover:scale-105 flex flex-col"
              >
                {/* Featured Image */}
                {post.featuredImage?.url && (
                  <div className="relative w-full h-40 overflow-hidden bg-gray-900">
                    <Image
                      src={post.featuredImage.url}
                      alt={post.featuredImage.altText || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-5 flex flex-col flex-grow">
                  {/* Category */}
                  {post.category && (
                    <span className="inline-block px-2 py-1 bg-red-500/10 text-red-400 text-xs font-semibold rounded-full mb-2 w-fit">
                      {post.category}
                    </span>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                  )}
                  
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto">
                    {publishDate && (
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{publishDate}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{readingTime} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

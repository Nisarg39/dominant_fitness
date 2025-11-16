import Image from 'next/image';

interface BlogHeaderProps {
  blog: {
    title: string;
    category?: string;
    featuredImage?: { url: string; altText?: string };
  };
}

export default function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <div className="relative w-full mb-12">
      {/* Featured Image */}
      {blog.featuredImage?.url && (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl">
          <Image
            src={blog.featuredImage.url}
            alt={blog.featuredImage.altText || blog.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              {blog.category && (
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full mb-4">
                  {blog.category}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {blog.title}
              </h1>
            </div>
          </div>
        </div>
      )}
      
      {/* No Featured Image */}
      {!blog.featuredImage?.url && (
        <div className="max-w-4xl mx-auto px-4">
          {blog.category && (
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full mb-4">
              {blog.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {blog.title}
          </h1>
        </div>
      )}
    </div>
  );
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from '@/server/actions/blogActions';
import { generateBlogMetadata } from '@/lib/seo/generateBlogMetadata';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogContent from '@/components/blog/BlogContent';
import BlogMeta from '@/components/blog/BlogMeta';
import BlogJsonLd from '@/components/blog/BlogJsonLd';
import Breadcrumbs from '@/components/blog/Breadcrumbs';
import RelatedPosts from '@/components/blog/RelatedPosts';
import ShareButtons from '@/components/blog/ShareButtons';
import BlogNavigation from '@/components/BlogNavigation';

// Generate static params for all published blogs
export async function generateStaticParams() {
  try {
    const result = await getBlogs(1, { status: 'published', limit: 1000 });
    
    if (!result.success || !result.data) return [];
    
    return result.data.map((blog: { slug: string }) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generateBlogMetadata(slug);
}

// Revalidate every hour
export const revalidate = 3600;

// Allow dynamic params for blogs not generated at build time
export const dynamicParams = true;

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);
  
  if (!result.success || !result.data) {
    notFound();
  }
  
  type Blog = {
    _id: string;
    slug: string;
    title: string;
    content: string;
    status: 'published' | 'draft' | 'scheduled';
    category?: string;
    tags?: string[];
    author?: string;
    publishDate?: string;
    updatedAt?: string;
    excerpt?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    featuredImage?: { url: string; altText?: string };
  };
  const blog = result.data as Blog;
  
  // Only show published blogs to public
  if (blog.status !== 'published') {
    notFound();
  }
  
  // Fetch related posts (same category, excluding current)
  const relatedResult = await getBlogs(1, {
    status: 'published',
    category: blog.category,
    limit: 3,
  });
  
  const relatedPosts = relatedResult.success && relatedResult.data
    ? relatedResult.data.filter((b: Blog) => b.slug !== blog.slug).slice(0, 3)
    : [];
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '/blogs' },
    { name: blog.title, url: `/blogs/${blog.slug}` },
  ];
  
  return (
    <>
      <BlogNavigation />
      <article className="min-h-screen pt-4">
        {/* JSON-LD Structured Data */}
        <BlogJsonLd blog={blog} />
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="pt-12 pb-20">
        {/* Blog Header */}
        <BlogHeader blog={blog} />
        
        <div className="max-w-4xl mx-auto px-4">
          {/* Meta Info */}
          <BlogMeta blog={blog} />
          
          {/* Blog Content */}
          <BlogContent content={blog.content} />
          
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-12 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-gray-400 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-[#fff200]/10 text-[#fff200] rounded-full text-sm hover:bg-[#fff200]/20 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Share Buttons */}
          <ShareButtons 
            url={`/blogs/${blog.slug}`}
            title={blog.title}
          />
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </div>
    </article>
    </>
  );
}

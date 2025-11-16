import { Metadata } from 'next';
import { getBlogs } from '@/server/actions/blogActions';
import { generateBlogListMetadata } from '@/lib/seo/generateBlogMetadata';
import BlogCard from '@/components/blog/BlogCard';
import BlogPagination from '@/components/blog/BlogPagination';
import BlogNavigation from '@/components/BlogNavigation';
import Link from 'next/link';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ page?: string; category?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const category = params.category;
  return generateBlogListMetadata(page, category);
}

export const revalidate = 60; // Revalidate every 60 seconds

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

type BlogListItem = {
  _id: string;
  slug: string;
  title: string;
  content?: string;
  excerpt?: string;
  category?: string;
  publishDate?: string;
  featured?: boolean;
  views?: number;
  featuredImage?: {
    url: string;
    altText?: string;
  };
};

type BlogListFilters = {
  status?: 'published' | 'draft' | 'scheduled';
  category?: string;
  search?: string;
};

export default async function BlogsPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const filters: BlogListFilters = { status: 'published' };
  
  if (params.category) filters.category = params.category;
  if (params.search) filters.search = params.search;
  
  const result = await getBlogs(page, filters);
  
  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Blogs</h1>
          <p className="text-gray-400">No blogs found.</p>
        </div>
      </div>
    );
  }
  
  const blogs = result.data;
  const pagination = result.pagination as { totalPages: number; total: number; hasNextPage: boolean; hasPrevPage: boolean };
  
  // Get unique categories for filter (matching database enum values)
  const categories = [
    { value: 'training', label: 'Training' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'recovery', label: 'Recovery' },
    { value: 'mindset', label: 'Mindset' },
    { value: 'sports-science', label: 'Sports Science' },
  ];
  
  return (
    <>
      <BlogNavigation />
      <div className="min-h-screen pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Performance Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Expert insights on sports performance, training, nutrition, and athlete development
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/blogs"
            className={`px-4 py-2 rounded-lg transition-colors ${
              !params.category
                ? 'bg-red-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All Posts
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/blogs?category=${cat.value}`}
              className={`px-4 py-2 rounded-lg transition-colors ${
                params.category === cat.value
                  ? 'bg-red-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
        
        {/* Search Info */}
        {params.search && (
          <div className="mb-8 text-center">
            <p className="text-gray-400">
              Showing results for: <span className="text-white font-semibold">&quot;{params.search}&quot;</span>
            </p>
          </div>
        )}
        
        {/* Blog Grid */}
          {blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {blogs.map((blog: BlogListItem) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
            
            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <BlogPagination 
                currentPage={page}
                totalPages={pagination.totalPages}
                category={params.category}
                search={params.search}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No blogs found matching your criteria.</p>
            <Link href="/blogs" className="inline-block mt-4 text-red-500 hover:text-red-400">
              Clear filters
            </Link>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

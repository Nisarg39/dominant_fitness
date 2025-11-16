'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Calendar,
  FileText,
  Eye,
  RefreshCw,
  Filter,
  X
} from 'lucide-react';
import { getBlogs, deleteBlog } from '@/server/actions/blogActions';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  status: string;
  category?: string;
  publishDate: string;
  createdAt: string;
  views?: number;
  featured?: boolean;
}

export default function AdminBlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);
  
  // Search and Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    
    try {
      const filters: { search?: string; status?: string; category?: string } = {};
      
      if (searchTerm) filters.search = searchTerm;
      if (filterStatus) filters.status = filterStatus;
      if (filterCategory) filters.category = filterCategory;
      
      const result = await getBlogs(currentPage, filters);
      
      if (result.success && result.data) {
        setBlogs(result.data);
        if (result.pagination) {
          const pagination = result.pagination as { totalPages: number; total: number };
          setTotalPages(pagination.totalPages);
          setTotalBlogs(pagination.total);
        }
      } else {
        setError(result.message || 'Failed to load blogs');
      }
    } catch (err) {
      setError('An error occurred while loading blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchTerm, filterStatus, filterCategory]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(
      `Are you sure you want to delete "${title}"?\n\nThis will permanently delete:\n- The blog post\n- Featured image from Cloudinary\n- All content images from Cloudinary\n\nThis action cannot be undone.`
    )) {
      return;
    }
    
    setDeleting(id);
    
    try {
      const result = await deleteBlog(id);
      
      if (result.success) {
        alert('Blog deleted successfully!');
        // Refresh the list
        fetchBlogs();
      } else {
        alert(result.message || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('An error occurred while deleting the blog');
    } finally {
      setDeleting('');
    }
  };

  const clearFilters = () => {
    setFilterStatus('');
    setFilterCategory('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const hasActiveFilters = filterStatus || filterCategory || searchTerm;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-oswald">
            Blog Posts
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {totalBlogs} total blog{totalBlogs !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchBlogs}
            className="flex items-center gap-2 px-4 py-2 glassmorphism-enhanced border border-red-500/20 text-white rounded-lg hover:border-red-500/40 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={20} />
            New Post
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blog posts by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 glassmorphism-enhanced border rounded-lg transition-colors ${
              showFilters || hasActiveFilters
                ? 'border-red-500/50 text-red-400'
                : 'border-red-500/20 text-gray-400'
            }`}
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Filter Controls */}
        {showFilters && (
          <div className="glassmorphism-enhanced border border-red-500/20 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white focus:outline-none focus:border-red-500/50"
                >
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white focus:outline-none focus:border-red-500/50"
                >
                  <option value="">All Categories</option>
                  <option value="training">Training</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="recovery">Recovery</option>
                  <option value="mindset">Mindset</option>
                  <option value="sports-science">Sports Science</option>
                </select>
              </div>
              
              <div className="flex items-end">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full justify-center"
                  >
                    <X size={18} />
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading blogs...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="glassmorphism-enhanced border border-red-500/50 rounded-lg p-6 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchBlogs}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Blog List */}
      {!loading && !error && (
        <>
          <div className="grid gap-4">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto text-gray-600 mb-4" size={48} />
                <p className="text-gray-400 mb-2">No blog posts found</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Clear filters to see all blogs
                  </button>
                )}
              </div>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="glassmorphism-enhanced border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Featured Image */}
                    {blog.featuredImage?.url && (
                      <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={blog.featuredImage.url}
                          alt={blog.featuredImage.altText || blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Blog Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2 font-oswald">
                            {blog.title}
                          </h3>
                          {blog.excerpt && (
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                              {blog.excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {new Date(blog.publishDate || blog.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            
                            {blog.category && (
                              <span className="px-2 py-1 rounded text-xs font-medium bg-blue-900 text-blue-300">
                                {blog.category}
                              </span>
                            )}
                            
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                blog.status === 'published'
                                  ? 'bg-green-900 text-green-300'
                                  : blog.status === 'draft'
                                  ? 'bg-yellow-900 text-yellow-300'
                                  : 'bg-purple-900 text-purple-300'
                              }`}
                            >
                              {blog.status}
                            </span>
                            
                            {blog.featured && (
                              <span className="px-2 py-1 rounded text-xs font-medium bg-red-900 text-red-300">
                                Featured
                              </span>
                            )}
                            
                            {blog.views !== undefined && (
                              <div className="flex items-center gap-1">
                                <Eye size={16} />
                                {blog.views}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {blog.status === 'published' && (
                            <Link
                              href={`/blogs/${blog.slug}`}
                              target="_blank"
                              className="p-2 text-gray-400 hover:bg-gray-500/10 rounded-lg transition-colors"
                              title="View on site"
                            >
                              <Eye size={18} />
                            </Link>
                          )}
                          <Link
                            href={`/admin/blog/${blog._id}/edit`}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                            onClick={() => handleDelete(blog._id, blog.title)}
                            disabled={deleting === blog._id}
                          >
                            {deleting === blog._id ? (
                              <div className="w-[18px] h-[18px] border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between glassmorphism-enhanced border border-red-500/20 rounded-lg p-4">
              <div className="text-gray-400 text-sm">
                Showing {blogs.length} of {totalBlogs} blog{totalBlogs !== 1 ? 's' : ''}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 glassmorphism-enhanced border border-red-500/20 text-white rounded-lg hover:border-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                            : 'glassmorphism-enhanced border border-red-500/20 text-gray-300 hover:border-red-500/40'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 glassmorphism-enhanced border border-red-500/20 text-white rounded-lg hover:border-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

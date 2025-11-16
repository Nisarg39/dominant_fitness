import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
  search?: string;
}

export default function BlogPagination({ currentPage, totalPages, category, search }: BlogPaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', page.toString());
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    const queryString = params.toString();
    return queryString ? `/blogs?${queryString}` : '/blogs';
  };
  
  // Generate page numbers to show (max 5 pages)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Show last page
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const pages = getPageNumbers();
  
  return (
    <div className="flex justify-center items-center gap-2">
      {/* Previous Button */}
      <a
        href={currentPage > 1 ? buildUrl(currentPage - 1) : '#'}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
          currentPage > 1
            ? 'bg-white/5 text-white hover:bg-white/10'
            : 'bg-white/5 text-gray-600 cursor-not-allowed'
        }`}
        onClick={(e) => currentPage <= 1 && e.preventDefault()}
      >
        <ChevronLeft size={16} />
        <span>Previous</span>
      </a>
      
      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }
          
          const pageNum = page as number;
          const isActive = pageNum === currentPage;
          
          return (
            <a
              key={pageNum}
              href={buildUrl(pageNum)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {pageNum}
            </a>
          );
        })}
      </div>
      
      {/* Next Button */}
      <a
        href={currentPage < totalPages ? buildUrl(currentPage + 1) : '#'}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
          currentPage < totalPages
            ? 'bg-white/5 text-white hover:bg-white/10'
            : 'bg-white/5 text-gray-600 cursor-not-allowed'
        }`}
        onClick={(e) => currentPage >= totalPages && e.preventDefault()}
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </a>
    </div>
  );
}

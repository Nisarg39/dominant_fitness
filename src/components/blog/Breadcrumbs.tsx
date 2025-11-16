import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={index} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-gray-500 line-clamp-1">{item.name}</span>
                ) : (
                  <a 
                    href={item.url}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                )}
                {!isLast && (
                  <ChevronRight size={16} className="text-gray-600" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

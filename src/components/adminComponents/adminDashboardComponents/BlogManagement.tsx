'use client';
import { useState } from 'react';
import AdminBlogList from './blogManagementComponents/AdminBlogList';

export default function BlogManagement() {
  const [activeTab, setActiveTab] = useState('blog-list');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'blog-list':
        return <AdminBlogList />;
      default:
        return <AdminBlogList />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glassmorphism-enhanced rounded-lg p-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('blog-list')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 interactive-element ${
              activeTab === 'blog-list'
                ? 'bg-gradient-to-r from-[#fff200] to-[#fff200] text-black shadow-lg glow-on-hover'
                : 'text-gray-300 hover:bg-[#fff200]/10 hover:text-white glow-on-hover'
            }`}
          >
            Blog Posts
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}

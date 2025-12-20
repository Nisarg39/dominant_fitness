'use client';
import { useState } from 'react';
import AdminSidebar from './adminDashboardComponents/AdminSidebar';
import UserManagement from './adminDashboardComponents/UserManagement';
import BlogManagement from './adminDashboardComponents/BlogManagement';

interface AdminDashboardProps {
  onSignOut: () => void;
}

export default function AdminDashboard({ onSignOut }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('user-management');

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      onSignOut();
    }
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'user-management':
        return <UserManagement />;
      case 'blog-management':
        return <BlogManagement />;
      case 'site-controls':
        return (
          <div className="glassmorphism-enhanced rounded-lg p-6">
            <h1 className="text-2xl font-bold text-white mb-4 animated-text">Site Controls</h1>
            <p className="text-gray-300">Site controls functionality will be implemented here.</p>
          </div>
        );
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="flex h-screen bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Geometric accents */}
        <div className="geometric-accent" style={{
          right: '10%',
          top: '20%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
      </div>

      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-64 overflow-auto relative z-10">
        {/* Header */}
        <div className="glassmorphism-enhanced border-b border-[#fff200]/20 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-white animated-text">
              {activeTab === 'user-management' ? 'User Management' : 
               activeTab === 'blog-management' ? 'Blog Management' : 'Site Controls'}
            </h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-gradient-to-r from-[#fff200] to-[#fff200] text-black rounded-lg hover:from-[#e6db00] hover:to-[#fff200] transition-all duration-300 transform hover:scale-105 glow-on-hover"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}
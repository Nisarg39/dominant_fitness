'use client';
import { useState } from 'react';
import AdminContactUs from './userManagementComponents/AdminContactUs';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('contact-us');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contact-us':
        return <AdminContactUs />;
      default:
        return <AdminContactUs />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="glassmorphism-enhanced rounded-lg p-6">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('contact-us')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 interactive-element ${
              activeTab === 'contact-us'
                ? 'bg-gradient-to-r from-[#fff200] to-[#fff200] text-black shadow-lg glow-on-hover'
                : 'text-gray-300 hover:bg-[#fff200]/10 hover:text-white glow-on-hover'
            }`}
          >
            Contact Us
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
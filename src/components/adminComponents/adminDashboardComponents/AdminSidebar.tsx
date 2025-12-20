'use client';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'user-management', label: 'User Management', icon: '👥' },
    { id: 'blog-management', label: 'Blog Management', icon: '📝' },
  ];

  return (
    <div className="w-64 bg-black text-white h-screen fixed left-0 top-0 z-10 shadow-2xl border-r border-[#fff200]/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-[#fff200]/20">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fff200] to-[#fff200] flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white animated-text">Admin Panel</h2>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="relative z-10 mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-300 interactive-element ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#fff200] to-[#fff200] text-black shadow-lg glow-on-hover'
                    : 'text-gray-300 hover:bg-[#fff200]/10 hover:text-white glow-on-hover'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#fff200]/20">
        <div className="text-sm text-gray-400 text-center">
          Admin Dashboard v1.0
        </div>
      </div>
    </div>
  );
}
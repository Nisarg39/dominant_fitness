'use client';
import { useState, useEffect } from 'react';
import { getContactUs } from "@/server/actions/adminActions";
import { markContactUsAsRead } from "@/server/actions/adminActions";

interface ContactUsData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContactUsResponse {
  success: boolean;
  data?: ContactUsData[];
  total?: number;
  currentPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  message?: string;
}

export default function AdminContactUs() {
  const [contactData, setContactData] = useState<ContactUsData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedMessage, setSelectedMessage] = useState<ContactUsData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchContactUs = async (page: number = 1) => {
    try {
      setLoading(true);
      setError('');
      const result: ContactUsResponse = await getContactUs(page);
      
      if (result.success) {
        setContactData(result.data || []);
        setCurrentPage(result.currentPage || 1);
        setTotalPages(result.totalPages || 1);
        setTotal(result.total || 0);
        
        // Calculate unread count from current page data
        const unreadMessages = (result.data || []).filter(contact => !contact.isRead).length;
        setUnreadCount(unreadMessages);
      } else {
        setError(result.message || 'Failed to fetch contact us data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error('Error fetching contact us data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      // Fetch all unread messages by getting all pages and counting unread
      let allUnreadCount = 0;
      let currentPage = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const result: ContactUsResponse = await getContactUs(currentPage);
        if (result.success && result.data) {
          const pageUnreadCount = result.data.filter(contact => !contact.isRead).length;
          allUnreadCount += pageUnreadCount;
          
          // Check if there are more pages
          hasMorePages = currentPage < (result.totalPages || 1);
          currentPage++;
        } else {
          hasMorePages = false;
        }
      }
      
      setUnreadCount(allUnreadCount);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  useEffect(() => {
    fetchContactUs(1);
    fetchUnreadCount();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchContactUs(page);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleMessageClick = async (contact: ContactUsData) => {
    setSelectedMessage(contact);
    setIsModalOpen(true);
    
    // Mark message as read if it's unread
    if (!contact.isRead) {
      try {
        const result = await markContactUsAsRead(contact._id);
        if (result.success) {
          // Update the contact data in the current state
          const updatedContact = { ...contact, isRead: true };
          setContactData(prevData => 
            prevData.map(item => 
              item._id === contact._id 
                ? updatedContact
                : item
            )
          );
          // Update selected message in modal
          setSelectedMessage(updatedContact);
          // Update unread count
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <div className="glassmorphism-enhanced rounded-lg p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fff200]"></div>
          <span className="ml-2 text-white">Loading contact us data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glassmorphism-enhanced rounded-lg p-6">
        <div className="text-center">
          <div className="text-[#fff200] mb-2">⚠️ Error</div>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => fetchContactUs(currentPage)}
            className="mt-4 px-4 py-2 bg-[#fff200] text-black rounded-lg hover:bg-[#ccc300] transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="glassmorphism-enhanced rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white animated-text">Contact Us Messages</h2>
          <div className="text-right">
            <div className="text-sm text-gray-300">
              Total: {total} messages
            </div>
            <div className="text-sm text-yellow-400 font-medium">
              Unread: {unreadCount} messages
            </div>
          </div>
        </div>
      </div>

      {/* Contact Messages Table */}
      <div className="glassmorphism-enhanced rounded-lg">
        {contactData.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-gray-400 text-lg mb-2">📭</div>
            <p className="text-gray-300">No contact us messages found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-red-500/20">
                <thead className="bg-[#fff200]/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-500/20">
                  {contactData.map((contact, index) => (
                    <tr key={contact._id} className="hover:bg-[#fff200]/5 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{contact.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleMessageClick(contact)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200 glow-on-hover"
                          title="View message"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          contact.isRead 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {contact.isRead ? 'Read' : 'Unread'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{formatDate(contact.createdAt)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-[#fff200]/20">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300">
                    Showing page {currentPage} of {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm bg-[#fff200]/20 text-white rounded-lg hover:bg-[#fff200]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Previous
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                          page === currentPage
                            ? 'bg-[#fff200] text-black'
                            : 'bg-[#fff200]/20 text-white hover:bg-[#fff200]/30'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm bg-[#fff200]/20 text-white rounded-lg hover:bg-[#fff200]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Message Modal */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glassmorphism-enhanced rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#fff200]/20 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Message Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <p className="text-white mt-1">{selectedMessage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <p className="text-white mt-1">{selectedMessage.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Phone</label>
                  <p className="text-white mt-1">{selectedMessage.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Date</label>
                  <p className="text-white mt-1">{formatDate(selectedMessage.createdAt)}</p>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="text-sm font-medium text-gray-300">Message</label>
                <div className="mt-2 p-4 bg-black/20 rounded-lg border border-[#fff200]/20">
                  <p className="text-white whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-300">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedMessage.isRead 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {selectedMessage.isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#fff200]/20 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#fff200] text-black rounded-lg hover:bg-[#ccc300] transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
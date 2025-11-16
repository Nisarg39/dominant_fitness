'use client';

import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState(url);
  
  useEffect(() => {
    // Set full URL only on client-side after hydration
    setFullUrl(`${window.location.origin}${url}`);
  }, [url]);
  
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`,
  };
  
  return (
    <div className="mt-12 pt-12 border-t border-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">Share this article</h3>
      <div className="flex flex-wrap gap-3">
        {/* Twitter */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} />
          <span>Twitter</span>
        </a>
        
        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#1565c0] text-white rounded-lg transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
          <span>Facebook</span>
        </a>
        
        {/* LinkedIn */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
          <span>LinkedIn</span>
        </a>
        
        {/* Email */}
        <a
          href={shareLinks.email}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          aria-label="Share via Email"
        >
          <Mail size={18} />
          <span>Email</span>
        </a>
        
        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          aria-label="Copy link"
        >
          <Link2 size={18} />
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}

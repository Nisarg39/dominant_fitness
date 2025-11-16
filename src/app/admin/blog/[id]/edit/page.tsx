'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, Save, Upload, X, Tag } from 'lucide-react';
import BlogEditor from '@/components/adminComponents/adminDashboardComponents/blogManagementComponents/BlogEditor';
import BlogPreview from '@/components/adminComponents/adminDashboardComponents/blogManagementComponents/BlogPreview';
import { BlogFormData } from '@/components/adminComponents/adminDashboardComponents/blogManagementComponents/types';
import { getBlog, updateBlog } from '@/server/actions/blogActions';

// Mock data - will be replaced with server action later
const mockBlog: BlogFormData = {
  title: 'Getting Started with Sports Performance Training',
  content: '<h1>Getting Started</h1><p>This is the content of the blog post...</p>',
  excerpt: 'Learn the fundamentals of sports performance training',
  featuredImage: 'https://via.placeholder.com/800x400',
  featuredImageAlt: 'Sports training',
  slug: 'getting-started-sports-performance',
  metaDescription: 'Comprehensive guide to starting your sports performance training journey',
  metaKeywords: ['sports', 'training', 'performance'],
  focusKeyword: 'sports performance',
  category: 'training',
  tags: ['beginner', 'fundamentals'],
  author: 'Coach Mike',
  status: 'published',
  publishDate: '2024-01-15',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: '',
  featured: false,
  allowComments: true,
  canonicalUrl: '',
};

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    featuredImageAlt: '',
    slug: '',
    metaDescription: '',
    metaKeywords: [],
    focusKeyword: '',
    category: '',
    tags: [],
    author: '',
    status: 'draft',
    publishDate: new Date().toISOString().split('T')[0],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    featured: false,
    allowComments: true,
    canonicalUrl: '',
  });
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'social' | 'settings'>('content');
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const result = await getBlog(params.id as string);
        
        if (result.success && result.data) {
          type BlogDb = {
            title?: string;
            content?: string;
            excerpt?: string;
            featuredImage?: { url?: string; altText?: string };
            slug?: string;
            metaDescription?: string;
            metaKeywords?: string[];
            focusKeyword?: string;
            category?: string;
            tags?: string[];
            author?: string;
            status?: 'draft' | 'published' | 'scheduled';
            publishDate?: string;
            ogTitle?: string;
            ogDescription?: string;
            ogImage?: { url?: string };
            twitterTitle?: string;
            twitterDescription?: string;
            twitterImage?: { url?: string };
            featured?: boolean;
            allowComments?: boolean;
            canonicalUrl?: string;
          };
          const blogData = result.data as BlogDb;
          
          // Transform database format to form format
          const transformedData: BlogFormData = {
            title: blogData.title || '',
            content: blogData.content || '',
            excerpt: blogData.excerpt || '',
            featuredImage: blogData.featuredImage?.url || '',
            featuredImageAlt: blogData.featuredImage?.altText || '',
            slug: blogData.slug || '',
            metaDescription: blogData.metaDescription || '',
            metaKeywords: blogData.metaKeywords || [],
            focusKeyword: blogData.focusKeyword || '',
            category: blogData.category || '',
            tags: blogData.tags || [],
            author: blogData.author || '',
            status: blogData.status || 'draft',
            publishDate: blogData.publishDate 
              ? new Date(blogData.publishDate).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],
            ogTitle: blogData.ogTitle || '',
            ogDescription: blogData.ogDescription || '',
            ogImage: blogData.ogImage?.url || '',
            twitterTitle: blogData.twitterTitle || '',
            twitterDescription: blogData.twitterDescription || '',
            twitterImage: blogData.twitterImage?.url || '',
            featured: blogData.featured || false,
            allowComments: blogData.allowComments !== undefined ? blogData.allowComments : true,
            canonicalUrl: blogData.canonicalUrl || '',
          };
          
          setFormData(transformedData);
        } else {
          alert(result.message || 'Failed to load blog');
          router.push('/admin');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        alert('An error occurred while loading the blog');
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id, router]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
  };

  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setFormData({ ...formData, featuredImage: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.metaKeywords.includes(keywordInput.trim())) {
      setFormData({ ...formData, metaKeywords: [...formData.metaKeywords, keywordInput.trim()] });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({ ...formData, metaKeywords: formData.metaKeywords.filter(k => k !== keyword) });
  };

  const [saving, setSaving] = useState(false);
  
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    if (!formData.metaDescription.trim()) {
      alert('Please add a meta description for SEO');
      return;
    }

    if (!formData.featuredImage) {
      alert('Please add a featured image');
      return;
    }

    setSaving(true);
    
    try {
      const result = await updateBlog(params.id as string, formData);
      
      if (result.success) {
        alert('Blog updated successfully!');
        router.push('/admin');
      } else {
        alert(result.message || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('An error occurred while updating the blog');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading blog post...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold text-white font-oswald">
            Edit Blog Post
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 glassmorphism-enhanced border border-red-500/20 text-white rounded-lg hover:border-red-500/40 transition-colors"
          >
            {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {saving ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glassmorphism-enhanced rounded-lg p-2">
        <div className="flex space-x-1">
          {[
            { id: 'content', label: 'Content', icon: '📝' },
            { id: 'seo', label: 'SEO', icon: '🔍' },
            { id: 'social', label: 'Social Media', icon: '📱' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'content' | 'seo' | 'social' | 'settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-red-500/10 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Tab - Reuse same structure from new blog page */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Blog Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full px-4 py-3 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 font-oswald text-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Featured Image * (Main image for blog cards)
            </label>
            <div className="space-y-3">
              {formData.featuredImage ? (
                <div className="relative glassmorphism-enhanced border border-red-500/20 rounded-lg p-4">
                  <img 
                    src={formData.featuredImage} 
                    alt="Featured" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setFormData({ ...formData, featuredImage: '' })}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 glassmorphism-enhanced border-2 border-dashed border-red-500/20 rounded-lg cursor-pointer hover:border-red-500/40 transition-colors">
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <span className="text-sm text-gray-400">Click to upload featured image</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFeaturedImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              <input
                type="text"
                value={formData.featuredImageAlt}
                onChange={(e) => setFormData({ ...formData, featuredImageAlt: e.target.value })}
                placeholder="Image alt text (for SEO and accessibility)"
                className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
              Excerpt (Short summary for blog list)
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Write a brief summary..."
              rows={3}
              className="w-full px-4 py-3 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 resize-none"
            />
          </div>

          {showPreview ? (
            <div>
              <h3 className="text-lg font-medium text-gray-300 mb-4">Preview</h3>
              <BlogPreview 
                content={formData.content} 
                title={formData.title}
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content *
              </label>
              <BlogEditor
                content={formData.content}
                onChange={(content: string) => setFormData({ ...formData, content })}
                placeholder="Start writing your blog post..."
              />
            </div>
          )}
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-6 glassmorphism-enhanced rounded-lg p-6">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
              URL Slug *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">/blogs/</span>
              <input
                id="slug"
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                placeholder="url-friendly-slug"
                className="flex-1 px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-300 mb-2">
              Meta Description * (150-160 characters)
            </label>
            <textarea
              id="metaDescription"
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              placeholder="Brief description for search engines..."
              rows={3}
              maxLength={160}
              className="w-full px-4 py-3 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 resize-none"
            />
            <div className="text-sm text-gray-400 mt-1">
              {formData.metaDescription.length}/160 characters
            </div>
          </div>

          <div>
            <label htmlFor="focusKeyword" className="block text-sm font-medium text-gray-300 mb-2">
              Focus Keyword
            </label>
            <input
              id="focusKeyword"
              type="text"
              value={formData.focusKeyword}
              onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
              placeholder="Main keyword for this post"
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Meta Keywords
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                placeholder="Add keyword and press Enter"
                className="flex-1 px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
              />
              <button
                onClick={addKeyword}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.metaKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                >
                  {keyword}
                  <button onClick={() => removeKeyword(keyword)} className="hover:text-red-300">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-300 mb-2">
              Canonical URL (Optional)
            </label>
            <input
              id="canonicalUrl"
              type="url"
              value={formData.canonicalUrl}
              onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
              placeholder="https://example.com/original-post"
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
            />
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <div className="space-y-6 glassmorphism-enhanced rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Open Graph (Facebook, LinkedIn)</h3>
          
          <div>
            <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-300 mb-2">
              OG Title
            </label>
            <input
              id="ogTitle"
              type="text"
              value={formData.ogTitle}
              onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
              placeholder={formData.title || "Title for social media shares"}
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div>
            <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-300 mb-2">
              OG Description
            </label>
            <textarea
              id="ogDescription"
              value={formData.ogDescription}
              onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
              placeholder={formData.metaDescription || "Description for social media shares"}
              rows={2}
              className="w-full px-4 py-3 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 resize-none"
            />
          </div>

          <div>
            <label htmlFor="ogImage" className="block text-sm font-medium text-gray-300 mb-2">
              OG Image URL (Leave blank to use featured image)
            </label>
            <input
              id="ogImage"
              type="url"
              value={formData.ogImage}
              onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
            />
          </div>

          <hr className="border-red-500/20 my-6" />

          <h3 className="text-xl font-bold text-white mb-4">Twitter Card</h3>

          <div>
            <label htmlFor="twitterTitle" className="block text-sm font-medium text-gray-300 mb-2">
              Twitter Title
            </label>
            <input
              id="twitterTitle"
              type="text"
              value={formData.twitterTitle}
              onChange={(e) => setFormData({ ...formData, twitterTitle: e.target.value })}
              placeholder={formData.ogTitle || formData.title || "Title for Twitter"}
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div>
            <label htmlFor="twitterDescription" className="block text-sm font-medium text-gray-300 mb-2">
              Twitter Description
            </label>
            <textarea
              id="twitterDescription"
              value={formData.twitterDescription}
              onChange={(e) => setFormData({ ...formData, twitterDescription: e.target.value })}
              placeholder={formData.ogDescription || formData.metaDescription || "Description for Twitter"}
              rows={2}
              className="w-full px-4 py-3 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 resize-none"
            />
          </div>

          <div>
            <label htmlFor="twitterImage" className="block text-sm font-medium text-gray-300 mb-2">
              Twitter Image URL (Leave blank to use OG image or featured image)
            </label>
            <input
              id="twitterImage"
              type="url"
              value={formData.twitterImage}
              onChange={(e) => setFormData({ ...formData, twitterImage: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
            />
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6 glassmorphism-enhanced rounded-lg p-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white focus:outline-none focus:border-red-500/50"
            >
              <option value="">Select a category</option>
              <option value="training">Training</option>
              <option value="nutrition">Nutrition</option>
              <option value="recovery">Recovery</option>
              <option value="mindset">Mindset</option>
              <option value="sports-science">Sports Science</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag and press Enter"
                className="flex-1 px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Tag size={16} />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm"
                >
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-red-300">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
              Author
            </label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Author name"
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'scheduled' })}
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white focus:outline-none focus:border-red-500/50"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          <div>
            <label htmlFor="publishDate" className="block text-sm font-medium text-gray-300 mb-2">
              Publish Date
            </label>
            <input
              id="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
              className="w-full px-4 py-2 glassmorphism-enhanced border border-red-500/20 rounded-lg text-white focus:outline-none focus:border-red-500/50"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 glassmorphism-enhanced border border-red-500/20 rounded-lg cursor-pointer hover:border-red-500/40 transition-colors">
              <span className="text-gray-300">Featured Post</span>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 glassmorphism-enhanced border border-red-500/20 rounded-lg cursor-pointer hover:border-red-500/40 transition-colors">
              <span className="text-gray-300">Allow Comments</span>
              <input
                type="checkbox"
                checked={formData.allowComments}
                onChange={(e) => setFormData({ ...formData, allowComments: e.target.checked })}
                className="w-5 h-5 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

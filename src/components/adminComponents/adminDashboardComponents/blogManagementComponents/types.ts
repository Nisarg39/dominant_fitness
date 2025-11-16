import { Editor as TiptapEditor } from '@tiptap/react';

export interface EditorContent {
  title: string;
  content: string;
}

export interface ToolbarProps {
  editor: TiptapEditor | null;
}

export interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export interface PreviewProps {
  content: string;
  title?: string;
}

export interface BlogFormData {
  // Basic Info
  title: string;
  content: string;
  excerpt: string;
  
  // Featured Image
  featuredImage: string;
  featuredImageAlt: string;
  
  // SEO Fields
  slug: string;
  metaDescription: string;
  metaKeywords: string[];
  focusKeyword: string;
  
  // Organization
  category: string;
  tags: string[];
  
  // Publishing
  author: string;
  status: 'draft' | 'published' | 'scheduled';
  publishDate: string;
  
  // Social Media
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  
  // Settings
  featured: boolean;
  allowComments: boolean;
  canonicalUrl: string;
}

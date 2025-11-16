import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  // Content
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  content: {
    type: String,
    required: [true, 'Blog content is required'],
  },
  excerpt: {
    type: String,
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters'],
  },
  
  // Featured Image
  featuredImage: {
    url: {
      type: String,
      required: [true, 'Featured image is required'],
    },
    publicId: {
      type: String, // Cloudinary public ID for deletion
    },
    altText: {
      type: String,
      default: '',
    },
  },
  
  // Content Images tracking (for cleanup on delete)
  contentImages: [{
    url: String,
    publicId: String,
  }],
  
  // SEO Fields
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters'],
  },
  metaKeywords: [{
    type: String,
    trim: true,
  }],
  focusKeyword: {
    type: String,
    trim: true,
  },
  canonicalUrl: {
    type: String,
    trim: true,
  },
  
  // Open Graph (Facebook, LinkedIn)
  ogTitle: {
    type: String,
    trim: true,
  },
  ogDescription: {
    type: String,
    trim: true,
  },
  ogImage: {
    url: String,
    publicId: String,
  },
  
  // Twitter Card
  twitterTitle: {
    type: String,
    trim: true,
  },
  twitterDescription: {
    type: String,
    trim: true,
  },
  twitterImage: {
    url: String,
    publicId: String,
  },
  
  // Categorization
  category: {
    type: String,
    enum: ['training', 'nutrition', 'recovery', 'mindset', 'sports-science', ''],
    default: '',
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  
  // Publishing
  author: {
    type: String,
    trim: true,
    default: 'Admin',
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled'],
    default: 'draft',
    index: true,
  },
  publishDate: {
    type: Date,
    default: Date.now,
  },
  featured: {
    type: Boolean,
    default: false,
    index: true,
  },
  allowComments: {
    type: Boolean,
    default: true,
  },
  
  // Analytics
  views: {
    type: Number,
    default: 0,
  },
  
}, { 
  timestamps: true, // Adds createdAt and updatedAt
});

// Indexes for better query performance
blogSchema.index({ title: 'text', content: 'text' }); // Full-text search
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ publishDate: -1 });

// Pre-save middleware to auto-generate slug if not provided
blogSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual for URL
blogSchema.virtual('url').get(function() {
  return `/blogs/${this.slug}`;
});

// Ensure virtuals are included in JSON
blogSchema.set('toJSON', { virtuals: true });
blogSchema.set('toObject', { virtuals: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;

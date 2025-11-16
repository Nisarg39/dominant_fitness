# Blog Backend Implementation Guide

**Project:** DOMINATE Performance - Blog Management System  
**Date Created:** November 11, 2025  
**Status:** Planning Phase  
**Last Updated:** November 11, 2025

---

## 📋 Table of Contents

1. [Architecture Analysis](#architecture-analysis)
2. [Implementation Checklist](#implementation-checklist)
3. [Detailed Implementation Steps](#detailed-implementation-steps)
4. [File Structure](#file-structure)
5. [Cloudinary Configuration](#cloudinary-configuration)
6. [API Reference](#api-reference)
7. [Database Schema](#database-schema)
8. [Frontend Integration](#frontend-integration)
9. [Testing Strategy](#testing-strategy)
10. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architecture Analysis

### Existing Backend Patterns (Analyzed from `/src/server`)

**Structure:**
```
src/server/
├── config/
│   └── mongoose.js          # DB connection with singleton pattern
├── models/
│   ├── admin.js            # Admin model with timestamps
│   └── contactUs.js        # Contact form model
├── actions/
│   ├── adminActions.js     # Server actions for admin
│   └── userActions.js      # Server actions for users
└── middleware/             # Empty (ready for future use)
```

**Key Patterns to Follow:**
1. ✅ Server Actions with `"use server"` directive
2. ✅ Singleton DB connection with `isConnected` flag
3. ✅ Try-catch error handling
4. ✅ Consistent response format: `{ success, message, data }`
5. ✅ JSON serialization: `JSON.parse(JSON.stringify())`
6. ✅ Mongoose model pattern: `mongoose.models.X || mongoose.model('X', schema)`
7. ✅ Timestamps in schemas: `{ timestamps: true }`
8. ✅ Pagination with skip/limit
9. ✅ Environment variable checks before DB operations

---

## ✅ Implementation Checklist

### Phase 1: Setup & Configuration
- [ ] Install Cloudinary SDK (`cloudinary`)
- [ ] Install TypeScript types (`@types/cloudinary`)
- [ ] Configure environment variables
- [ ] Create `.env.example` documentation
- [ ] Test Cloudinary connection

### Phase 2: Core Backend Structure
- [ ] Create Blog model (`src/server/models/blog.js`)
- [ ] Create Cloudinary service (`src/server/services/cloudinary.js`)
- [ ] Create blog actions (`src/server/actions/blogActions.js`)
- [ ] Add image upload utilities

### Phase 3: Server Actions (CRUD)
- [ ] `createBlog(formData)` - Create new blog with image upload
- [ ] `updateBlog(id, formData)` - Update blog with image management
- [ ] `deleteBlog(id)` - Delete blog with Cloudinary cleanup
- [ ] `getBlog(id)` - Get single blog by ID
- [ ] `getBlogBySlug(slug)` - Get blog by URL slug
- [ ] `getBlogs(page, filters)` - List blogs with pagination
- [ ] `publishBlog(id)` - Publish draft blog
- [ ] `uploadBlogImage(base64Data)` - Upload individual images
- [ ] `deleteBlogImage(publicId)` - Delete specific image

### Phase 4: Frontend Integration
- [ ] Update `new/page.tsx` with `createBlog` action
- [ ] Update `[id]/edit/page.tsx` with `updateBlog` action
- [ ] Add loading states
- [ ] Add success/error notifications
- [ ] Add image upload progress indicators
- [ ] Test form validation

### Phase 5: Testing & Documentation
- [ ] Test create blog flow
- [ ] Test update blog flow
- [ ] Test delete blog flow
- [ ] Test image upload/replacement
- [ ] Test Cloudinary cleanup
- [ ] Document API usage
- [ ] Update README with setup instructions

---

## 🚀 Detailed Implementation Steps

### Step 1: Install Dependencies

```bash
# Install Cloudinary SDK
npm install cloudinary

# Install TypeScript types (optional but recommended)
npm install --save-dev @types/cloudinary
```

**Verification:**
- Check `package.json` for `cloudinary` in dependencies
- Version should be latest stable (3.x)

---

### Step 2: Environment Configuration

**Add to `.env.local`:**
```env
# MongoDB (existing)
MONGODBURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration (NEW)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_BLOG_FOLDER=dominate-blog
```

**Create `.env.example`:**
```env
MONGODBURL=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_BLOG_FOLDER=dominate-blog
```

**Cloudinary Setup:**
1. Go to https://cloudinary.com/
2. Sign up or login
3. Navigate to Dashboard
4. Copy Cloud Name, API Key, API Secret
5. Add to `.env.local`

---

### Step 3: Create Cloudinary Service

**File:** `src/server/services/cloudinary.js`

**Features:**
- Initialize Cloudinary with credentials
- Upload images with optimization
- Delete images by public_id
- Batch delete for blog cleanup
- Extract public_id from Cloudinary URLs
- Handle base64 image uploads

**Key Functions:**
- `uploadImage(base64Data, folder, filename)` - Upload and optimize
- `deleteImage(publicId)` - Delete single image
- `deleteImages(publicIds)` - Batch delete
- `extractPublicId(url)` - Get ID from URL
- `replaceImage(oldPublicId, newBase64Data, folder)` - Replace with cleanup

---

### Step 4: Create Blog Model

**File:** `src/server/models/blog.js`

**Schema Fields:**

```javascript
{
  // Content
  title: String (required, indexed),
  slug: String (required, unique, indexed),
  content: String (required),
  excerpt: String,
  
  // Featured Image
  featuredImage: {
    url: String,
    publicId: String,
    altText: String
  },
  
  // Content Images tracking
  contentImages: [{
    url: String,
    publicId: String
  }],
  
  // SEO
  metaDescription: String (max 160 chars),
  metaKeywords: [String],
  focusKeyword: String,
  canonicalUrl: String,
  
  // Social Media
  ogTitle: String,
  ogDescription: String,
  ogImage: {
    url: String,
    publicId: String
  },
  twitterTitle: String,
  twitterDescription: String,
  twitterImage: {
    url: String,
    publicId: String
  },
  
  // Categorization
  category: String (enum),
  tags: [String],
  
  // Publishing
  author: String,
  status: String (enum: 'draft', 'published', 'scheduled'),
  publishDate: Date,
  featured: Boolean (default: false),
  allowComments: Boolean (default: true),
  
  // Analytics
  views: Number (default: 0),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

---

### Step 5: Create Blog Server Actions

**File:** `src/server/actions/blogActions.js`

#### Action 1: `createBlog(formData)`
```javascript
Purpose: Create new blog post with image uploads
Input: BlogFormData object
Process:
  1. Validate required fields
  2. Generate unique slug from title
  3. Upload featured image to Cloudinary
  4. Extract and upload content images
  5. Replace base64 URLs with Cloudinary URLs in content
  6. Create blog document with all data
  7. Return success with blog ID
Output: { success, message, blogId, slug }
```

#### Action 2: `updateBlog(id, formData)`
```javascript
Purpose: Update existing blog with smart image management
Input: Blog ID, updated BlogFormData
Process:
  1. Fetch existing blog
  2. Compare featured image - delete old if changed
  3. Upload new featured image if provided
  4. Compare content images - delete removed ones
  5. Upload new content images
  6. Update blog document
  7. Clean up orphaned images
Output: { success, message, blog }
```

#### Action 3: `deleteBlog(id)`
```javascript
Purpose: Delete blog and all associated images
Input: Blog ID
Process:
  1. Fetch blog to get all Cloudinary publicIds
  2. Delete featured image from Cloudinary
  3. Delete all content images from Cloudinary
  4. Delete OG/Twitter images if custom
  5. Delete blog document from DB
Output: { success, message }
```

#### Action 4: `getBlog(id)` / `getBlogBySlug(slug)`
```javascript
Purpose: Fetch single blog post
Input: Blog ID or slug
Process:
  1. Connect to DB
  2. Find blog by id or slug
  3. Increment views counter
  4. Serialize for Next.js
Output: { success, data: blog }
```

#### Action 5: `getBlogs(page, filters)`
```javascript
Purpose: List blogs with pagination and filters
Input: page number, filters object
Filters:
  - category: string
  - tags: array
  - status: string
  - featured: boolean
  - search: string (title/content)
Process:
  1. Build query from filters
  2. Apply pagination (10 per page)
  3. Sort by publishDate desc
  4. Get total count
  5. Calculate pagination metadata
Output: {
  success,
  data: blogs[],
  pagination: {
    total,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage
  }
}
```

#### Action 6: `uploadBlogImage(base64Data, type)`
```javascript
Purpose: Upload single image (for editor)
Input: base64 image data, type ('featured'|'content')
Process:
  1. Determine folder based on type
  2. Upload to Cloudinary with optimization
  3. Return Cloudinary URL
Output: { success, url, publicId }
```

---

## 📁 File Structure

```
src/server/
├── config/
│   └── mongoose.js                 # Existing DB config
├── models/
│   ├── admin.js                   # Existing
│   ├── contactUs.js               # Existing
│   └── blog.js                    # NEW - Blog model
├── services/
│   └── cloudinary.js              # NEW - Cloudinary service
└── actions/
    ├── adminActions.js            # Existing
    ├── userActions.js             # Existing
    └── blogActions.js             # NEW - Blog CRUD actions
```

---

## ☁️ Cloudinary Configuration

### Folder Structure
```
dominate-blog/
├── featured/           # Featured images (1200x630 OG size)
├── content/            # Blog content images (various sizes)
├── og-images/          # Custom Open Graph images
└── twitter-images/     # Custom Twitter card images
```

### Image Optimization Settings

**Featured Images:**
```javascript
{
  folder: 'dominate-blog/featured',
  transformation: [
    { width: 1200, height: 630, crop: 'fill', gravity: 'auto' },
    { quality: 'auto:good' },
    { fetch_format: 'auto' }
  ]
}
```

**Content Images:**
```javascript
{
  folder: 'dominate-blog/content',
  transformation: [
    { width: 1600, crop: 'limit' },  // Max width
    { quality: 'auto:good' },
    { fetch_format: 'auto' }
  ]
}
```

### Image Lifecycle

1. **Upload:** Base64 → Cloudinary → Get URL + publicId
2. **Store:** Save URL and publicId in database
3. **Update:** Check publicId change → Delete old → Upload new
4. **Delete:** Fetch all publicIds → Batch delete from Cloudinary → Delete DB record

---

## 🔗 Frontend Integration

### Update Create Blog Page

**File:** `src/app/admin/blog/new/page.tsx`

```javascript
// Replace handleSave function
const handleSave = async () => {
  // Validation
  if (!formData.title.trim() || !formData.content.trim()) {
    alert('Title and content are required');
    return;
  }
  
  if (!formData.featuredImage) {
    alert('Featured image is required');
    return;
  }
  
  if (!formData.slug) {
    formData.slug = generateSlug(formData.title);
  }
  
  // Call server action
  setLoading(true);
  try {
    const result = await createBlog(formData);
    
    if (result.success) {
      alert('Blog created successfully!');
      router.push('/admin');
    } else {
      alert(result.message || 'Failed to create blog');
    }
  } catch (error) {
    console.error('Error creating blog:', error);
    alert('An error occurred while creating the blog');
  } finally {
    setLoading(false);
  }
};
```

### Update Edit Blog Page

**File:** `src/app/admin/blog/[id]/edit/page.tsx`

```javascript
// Update handleSave function
const handleSave = async () => {
  // Validation
  if (!formData.title.trim() || !formData.content.trim()) {
    alert('Title and content are required');
    return;
  }
  
  // Call server action
  setLoading(true);
  try {
    const result = await updateBlog(params.id, formData);
    
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
    setLoading(false);
  }
};
```

---

## 🧪 Testing Strategy

### Manual Testing Checklist

**Create Blog:**
- [ ] Create blog with all fields filled
- [ ] Create blog with only required fields
- [ ] Verify featured image uploaded to Cloudinary
- [ ] Verify content images uploaded to Cloudinary
- [ ] Verify slug generation
- [ ] Check database record

**Update Blog:**
- [ ] Update text fields only
- [ ] Replace featured image
- [ ] Add new content images
- [ ] Remove content images
- [ ] Verify old images deleted from Cloudinary

**Delete Blog:**
- [ ] Delete blog
- [ ] Verify all images deleted from Cloudinary
- [ ] Verify database record deleted

**List Blogs:**
- [ ] Test pagination
- [ ] Test category filter
- [ ] Test tag filter
- [ ] Test status filter
- [ ] Test search

---

## 🔧 Troubleshooting

### Common Issues

**Issue: Cloudinary upload fails**
```
Solution: 
1. Check environment variables are set
2. Verify Cloudinary credentials
3. Check image size (Cloudinary free tier: 10MB limit)
4. Check base64 format is correct
```

**Issue: Images not deleted from Cloudinary**
```
Solution:
1. Verify publicId is stored correctly in DB
2. Check Cloudinary API permissions
3. Verify folder structure matches
4. Check for typos in publicId
```

**Issue: Duplicate slugs**
```
Solution:
1. Add unique index on slug field
2. Generate slug with timestamp if duplicate
3. Validate slug uniqueness before save
```

**Issue: Large images causing timeout**
```
Solution:
1. Add file size validation on frontend (max 5MB)
2. Compress images before upload
3. Increase Next.js API timeout if needed
4. Use Cloudinary's eager transformation
```

---

## 📊 Progress Tracking

### Current Status: PLANNING PHASE ✅

**Completed:**
- [x] Backend architecture analysis
- [x] Implementation plan created
- [x] Documentation created

**In Progress:**
- [ ] Setting up Cloudinary SDK

**Pending:**
- [ ] Blog model creation
- [ ] Cloudinary service implementation
- [ ] Blog actions implementation
- [ ] Frontend integration
- [ ] Testing

---

## 📝 Notes

### Design Decisions

1. **Why store publicIds?** - To properly delete images from Cloudinary when blog is updated/deleted
2. **Why separate folders?** - Better organization and easier to manage in Cloudinary dashboard
3. **Why optimize on upload?** - Faster page loads, better SEO, reduced bandwidth
4. **Why soft delete?** - Allows recovery of accidentally deleted blogs (optional implementation)

### Future Enhancements

- [ ] Blog versioning (save draft versions)
- [ ] Scheduled publishing with cron job
- [ ] Image CDN caching strategy
- [ ] Blog analytics (views, engagement)
- [ ] Comment system implementation
- [ ] Blog categories management page
- [ ] Bulk operations (delete, publish multiple)
- [ ] Search with full-text indexing
- [ ] Related posts algorithm
- [ ] RSS feed generation

---

## 🔗 References

- [Cloudinary Node.js SDK Docs](https://cloudinary.com/documentation/node_integration)
- [Next.js 15 Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Mongoose Schema Guide](https://mongoosejs.com/docs/guide.html)
- [Tiptap Editor](https://tiptap.dev/)

---

**Last Updated:** November 11, 2025  
**Next Session Action:** Start with Step 1 - Install Cloudinary SDK

# Blog Backend - Quick Implementation Checklist

**Status:** 🟡 In Progress  
**Date:** November 11, 2025

---

## 📦 Phase 1: Setup (15 mins)

### Dependencies
- [ ] `npm install cloudinary`
- [ ] `npm install --save-dev @types/cloudinary`

### Environment Variables (.env.local)
- [ ] `CLOUDINARY_CLOUD_NAME=your_cloud_name`
- [ ] `CLOUDINARY_API_KEY=your_api_key`
- [ ] `CLOUDINARY_API_SECRET=your_api_secret`
- [ ] `CLOUDINARY_BLOG_FOLDER=dominate-blog`

### Documentation
- [ ] Create `.env.example` with placeholders
- [ ] Test Cloudinary connection

---

## 🏗️ Phase 2: Backend Core (90 mins)

### File 1: Blog Model
**Path:** `src/server/models/blog.js`
- [ ] Create file
- [ ] Define schema with all fields
- [ ] Add indexes (title, slug, status, category)
- [ ] Add timestamps
- [ ] Export model with mongoose pattern
- [ ] **Test:** Can create document manually

### File 2: Cloudinary Service
**Path:** `src/server/services/cloudinary.js`
- [ ] Create file
- [ ] Configure Cloudinary client
- [ ] `uploadImage(base64, folder, filename)` function
- [ ] `deleteImage(publicId)` function
- [ ] `deleteImages(publicIds[])` function
- [ ] `extractPublicId(url)` function
- [ ] Error handling for all functions
- [ ] **Test:** Upload and delete test image

### File 3: Blog Actions
**Path:** `src/server/actions/blogActions.js`
- [ ] Create file with `"use server"`
- [ ] Import dependencies
- [ ] `createBlog(formData)` - Complete
- [ ] `updateBlog(id, formData)` - Complete
- [ ] `deleteBlog(id)` - Complete
- [ ] `getBlog(id)` - Complete
- [ ] `getBlogBySlug(slug)` - Complete
- [ ] `getBlogs(page, filters)` - Complete
- [ ] `publishBlog(id)` - Complete
- [ ] `uploadBlogImage(base64)` - Complete
- [ ] Error handling and response format
- [ ] **Test:** Each action with sample data

---

## 🔗 Phase 3: Frontend Integration (45 mins)

### New Blog Page
**Path:** `src/app/admin/blog/new/page.tsx`
- [ ] Import `createBlog` action
- [ ] Replace `handleSave` function
- [ ] Add loading state during save
- [ ] Add success/error alerts
- [ ] Test full create flow
- [ ] Verify Cloudinary uploads

### Edit Blog Page
**Path:** `src/app/admin/blog/[id]/edit/page.tsx`
- [ ] Import `updateBlog` and `getBlog` actions
- [ ] Update `useEffect` to fetch real blog data
- [ ] Replace `handleSave` function
- [ ] Add loading state during save
- [ ] Add success/error alerts
- [ ] Test full update flow
- [ ] Verify image replacement

### Admin Dashboard (Optional)
**Path:** `src/app/admin/page.tsx`
- [ ] Import `getBlogs` action
- [ ] Display blog list with real data
- [ ] Add delete functionality
- [ ] Add pagination controls

---

## 🧪 Phase 4: Testing (30 mins)

### Create Flow
- [ ] Fill all required fields
- [ ] Upload featured image
- [ ] Add images in content editor
- [ ] Submit form
- [ ] Verify success message
- [ ] Check Cloudinary dashboard for images
- [ ] Check MongoDB for blog document
- [ ] Verify all fields saved correctly

### Update Flow
- [ ] Open existing blog in edit mode
- [ ] Change text fields
- [ ] Replace featured image
- [ ] Add/remove content images
- [ ] Submit form
- [ ] Verify old featured image deleted from Cloudinary
- [ ] Verify new images uploaded
- [ ] Check MongoDB for updated data

### Delete Flow
- [ ] Delete a blog post
- [ ] Verify blog removed from database
- [ ] Check Cloudinary - all images should be deleted
- [ ] Verify no orphaned images

### List/Pagination
- [ ] Create 15+ test blogs
- [ ] Test pagination works
- [ ] Test filtering by category
- [ ] Test filtering by status
- [ ] Test search functionality

---

## 📋 Quick Command Reference

```bash
# Install dependencies
npm install cloudinary
npm install --save-dev @types/cloudinary

# Run dev server
npm run dev

# Check for TypeScript errors
npx tsc --noEmit

# Run linter
npm run lint

# Check build
npm run build
```

---

## 🐛 Common Issues & Fixes

### ❌ "Cloudinary credentials not found"
```bash
# Check .env.local file exists
# Verify variables are spelled correctly
# Restart dev server after adding variables
```

### ❌ "Image upload timeout"
```bash
# Reduce image size on frontend (max 5MB)
# Check network connection
# Verify Cloudinary API limits not exceeded
```

### ❌ "Slug already exists"
```bash
# Add unique validation
# Generate slug with timestamp suffix
# Check database for existing slugs
```

### ❌ "Images not deleting from Cloudinary"
```bash
# Verify publicId is stored correctly in DB
# Check Cloudinary API credentials
# Ensure folder structure matches
```

---

## ✅ Completion Criteria

**Backend is complete when:**
- [ ] All 8 server actions working
- [ ] Images upload to Cloudinary successfully
- [ ] Images delete from Cloudinary on update/delete
- [ ] Blog data saves to MongoDB correctly
- [ ] No TypeScript/linting errors
- [ ] Create blog flow works end-to-end
- [ ] Edit blog flow works end-to-end
- [ ] Delete blog flow works end-to-end

**Frontend integration is complete when:**
- [ ] Can create new blog from admin UI
- [ ] Can edit existing blog from admin UI
- [ ] Can delete blog from admin UI
- [ ] Loading states working
- [ ] Error handling working
- [ ] Success messages showing

---

## 📊 Progress Tracker

**Session 1:** [Date]
- Setup Cloudinary SDK
- Created blog model
- Started Cloudinary service

**Session 2:** [Date]
- Completed Cloudinary service
- Created blog actions
- Started frontend integration

**Session 3:** [Date]
- Completed frontend integration
- Testing and bug fixes

---

## 🎯 Next Session Quick Start

**Before coding, check:**
1. Read `BLOG_BACKEND_IMPLEMENTATION.md` for context
2. Check this checklist for completed items
3. Review last session's progress notes
4. Test previous work still functional

**Start with:** [Next unchecked item from checklist]

---

**Full Documentation:** See `BLOG_BACKEND_IMPLEMENTATION.md`

# Blog Backend - Testing Guide

**Status:** Ready for Testing  
**Prerequisites:** Cloudinary credentials configured

---

## 🔧 Setup Before Testing

### 1. Get Cloudinary Credentials

1. Go to https://cloudinary.com/
2. Sign up for a free account (or login)
3. Go to Dashboard
4. Copy the following:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. Configure Environment Variables

Add to `.env.local` (create if it doesn't exist):

```env
# Existing MongoDB & JWT
MONGODBURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary (NEW - Required for blog images)
CLOUDINARY_CLOUD_NAME=your-cloud-name-here
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here
CLOUDINARY_BLOG_FOLDER=dominate-blog
```

### 3. Restart Dev Server

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

---

## ✅ Testing Checklist

### Test 1: Create New Blog

**Steps:**
1. Navigate to `/admin`
2. Click "Blog Management" or go to `/admin/blog/new`
3. Fill in the form:
   - **Title:** "Test Blog Post - My First Blog"
   - **Featured Image:** Upload any image
   - **Image Alt Text:** "Test image"
   - **Excerpt:** "This is a test blog post"
   - **Content:** Add some text and paste/upload an image in the editor
   - **SEO Tab:**
     - Slug: Should auto-generate (or edit manually)
     - Meta Description: "Test blog for SEO"
     - Focus Keyword: "test blog"
     - Add 2-3 meta keywords
   - **Social Media Tab:**
     - Fill OG Title: "Test Blog - Social Share"
     - OG Description: "Test description for social"
   - **Settings Tab:**
     - Category: Select "Training"
     - Tags: Add "test", "demo"
     - Author: "Test Author"
     - Status: "published"
4. Click "Save Post"
5. Wait for "Blog created successfully!" message

**Expected Results:**
- ✅ Success alert appears
- ✅ Redirected to `/admin`
- ✅ Check Cloudinary dashboard - should see uploaded images in `dominate-blog/` folder
- ✅ Check MongoDB - new blog document should exist

---

### Test 2: Edit Existing Blog

**Steps:**
1. Go to `/admin/blog/[id]/edit` (replace [id] with actual blog ID from database)
2. Verify all fields are loaded correctly
3. Make changes:
   - Change title
   - Replace featured image with a new one
   - Add new content image
   - Remove old content image
   - Update meta description
   - Add new tag
4. Click "Update Post"
5. Wait for "Blog updated successfully!" message

**Expected Results:**
- ✅ Form loads with existing data
- ✅ Success alert appears
- ✅ Changes saved to database
- ✅ Old featured image deleted from Cloudinary
- ✅ New featured image uploaded to Cloudinary
- ✅ Old content image deleted from Cloudinary (if removed)

---

### Test 3: Image Upload & Management

**Steps:**
1. Create a new blog
2. Upload a featured image (test various sizes: 500KB, 2MB, 5MB)
3. In content editor:
   - Paste an image from clipboard
   - Use image button to upload
   - Add 3-4 images total
4. Save blog
5. Check Cloudinary dashboard

**Expected Results:**
- ✅ Featured image appears in `dominate-blog/featured/` folder
- ✅ Content images appear in `dominate-blog/content/` folder
- ✅ Images are optimized (check file sizes in Cloudinary)
- ✅ Images have proper public IDs
- ✅ Base64 images in content replaced with Cloudinary URLs

---

### Test 4: Delete Blog

**Steps:**
1. Create a test blog with featured image and content images
2. Note the Cloudinary public IDs (or check Cloudinary dashboard)
3. Call delete function (you'll need to add delete button to UI or use browser console):
   ```javascript
   // In browser console on admin page
   import { deleteBlog } from '@/server/actions/blogActions';
   await deleteBlog('blog-id-here');
   ```
4. Check Cloudinary dashboard

**Expected Results:**
- ✅ Blog deleted from database
- ✅ ALL images deleted from Cloudinary
- ✅ No orphaned images left

---

### Test 5: Slug Generation

**Steps:**
1. Create blog with title: "My Amazing Blog Post 2024!"
2. Don't fill slug field manually
3. Save blog
4. Check database for slug

**Expected Result:**
- ✅ Slug should be: `my-amazing-blog-post-2024`
- ✅ No special characters
- ✅ All lowercase
- ✅ Spaces replaced with hyphens

---

### Test 6: Duplicate Slug Handling

**Steps:**
1. Create blog with slug: "test-post"
2. Try to create another blog with same title (to generate same slug)
3. Save second blog

**Expected Result:**
- ✅ First blog: slug = `test-post`
- ✅ Second blog: slug = `test-post-1`
- ✅ No duplicate slug error

---

### Test 7: Image Replacement

**Steps:**
1. Create blog with featured image A
2. Save blog
3. Note Cloudinary public ID of image A
4. Edit blog and replace with featured image B
5. Save blog
6. Check Cloudinary dashboard

**Expected Results:**
- ✅ Image B uploaded successfully
- ✅ Image A deleted from Cloudinary
- ✅ Blog shows image B
- ✅ Database has image B's public ID

---

### Test 8: Validation

**Steps:**
1. Try to save blog without title → Should show error
2. Try to save blog without content → Should show error
3. Try to save blog without meta description → Should show error
4. Try to save blog without featured image → Should show error

**Expected Results:**
- ✅ Alert messages appear
- ✅ Blog not saved
- ✅ Form stays on page

---

### Test 9: Loading States

**Steps:**
1. Create new blog
2. Upload large image (5MB)
3. Click "Save Post"
4. Observe button

**Expected Results:**
- ✅ Button shows "Saving..." during upload
- ✅ Button is disabled during save
- ✅ Can't click save multiple times

---

### Test 10: Fetch Blog (Edit Mode)

**Steps:**
1. Create and save a blog
2. Go to edit page for that blog
3. Observe loading state
4. Check if all fields populate correctly

**Expected Results:**
- ✅ Shows "Loading blog post..." initially
- ✅ All fields populate with correct data
- ✅ Featured image preview shows
- ✅ Content loads in editor
- ✅ All tabs load correctly

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cloudinary credentials not configured"

**Solution:**
- Check `.env.local` has all Cloudinary variables
- Restart dev server after adding variables
- Verify variable names are spelled correctly

---

### Issue 2: Images not uploading

**Solution:**
- Check image file size (max 10MB for free Cloudinary)
- Verify image format is supported (jpg, png, webp, etc.)
- Check browser console for errors
- Verify Cloudinary credentials are correct

---

### Issue 3: Old images not deleting

**Solution:**
- Check that public IDs are being stored correctly in database
- Verify Cloudinary API secret is correct
- Check Cloudinary dashboard for API usage limits
- Look for error messages in server console

---

### Issue 4: Slug conflicts

**Solution:**
- Our code handles this automatically with counter suffix
- If still seeing issues, check database for existing slugs
- Manually set unique slug in form

---

### Issue 5: MongoDB connection error

**Solution:**
- Verify `MONGODBURL` in `.env.local`
- Check MongoDB Atlas network access (whitelist your IP)
- Ensure database user has write permissions

---

## 📊 Test Results Template

Copy this template to track your testing:

```markdown
## Test Results - [Date]

### Environment
- Node Version: [version]
- Next.js Version: 15.4.5
- Cloudinary Account: [Free/Paid]
- MongoDB: [Atlas/Local]

### Test 1: Create New Blog
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 2: Edit Existing Blog
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 3: Image Upload & Management
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 4: Delete Blog
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 5: Slug Generation
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 6: Duplicate Slug Handling
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 7: Image Replacement
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 8: Validation
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 9: Loading States
- Status: [ ] Pass / [ ] Fail
- Notes:

### Test 10: Fetch Blog (Edit Mode)
- Status: [ ] Pass / [ ] Fail
- Notes:

### Overall Status
- Total Tests: 10
- Passed: [X]
- Failed: [Y]
- Ready for Production: [ ] Yes / [ ] No
```

---

## 🚀 Ready to Test?

1. ✅ Cloudinary credentials configured
2. ✅ Environment variables set
3. ✅ Dev server running
4. ✅ MongoDB connected

**Start with Test 1: Create New Blog**

Good luck! 🎉

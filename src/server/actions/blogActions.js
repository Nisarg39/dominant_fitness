"use server"

import { connectToDB } from '@/server/config/mongoose';
import Blog from '@/server/models/blog';
import { 
  uploadFeaturedImage, 
  uploadImage,
  deleteImage, 
  deleteImages,
  extractPublicId,
  extractPublicIdsFromHtml 
} from '@/server/services/cloudinary';

/**
 * Generate unique slug from title
 */
function generateSlug(title) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  return baseSlug;
}

/**
 * Ensure slug is unique by appending number if needed
 */
async function ensureUniqueSlug(slug, excludeId = null) {
  let uniqueSlug = slug;
  let counter = 1;
  
  while (true) {
    const query = { slug: uniqueSlug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const existing = await Blog.findOne(query);
    if (!existing) {
      return uniqueSlug;
    }
    
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
}

/**
 * Create a new blog post
 * @param {Object} formData - Blog form data
 * @returns {Promise<{success: boolean, message: string, blogId?: string, slug?: string}>}
 */
export async function createBlog(formData) {
  try {
    await connectToDB();

    // Validate required fields
    if (!formData.title || !formData.content) {
      return { success: false, message: 'Title and content are required' };
    }

    if (!formData.featuredImage) {
      return { success: false, message: 'Featured image is required' };
    }

    // Generate or validate slug
    let slug = formData.slug || generateSlug(formData.title);
    slug = await ensureUniqueSlug(slug);

    // Upload featured image to Cloudinary
    let featuredImageData = null;
    if (formData.featuredImage && formData.featuredImage.startsWith('data:')) {
      const uploadedImage = await uploadFeaturedImage(formData.featuredImage, slug);
      featuredImageData = {
        url: uploadedImage.url,
        publicId: uploadedImage.publicId,
        altText: formData.featuredImageAlt || formData.title,
      };
    } else {
      // If already a URL (from edit), keep as is
      featuredImageData = {
        url: formData.featuredImage,
        publicId: extractPublicId(formData.featuredImage),
        altText: formData.featuredImageAlt || formData.title,
      };
    }

    // Extract and upload content images if they're base64
    let processedContent = formData.content;
    const contentImages = [];
    
    // Find all base64 images in content
    const base64ImageRegex = /<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g;
    const matches = [...processedContent.matchAll(base64ImageRegex)];
    
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const base64Data = match[1];
      
      try {
        const uploadedImage = await uploadImage(
          base64Data, 
          `${process.env.CLOUDINARY_BLOG_FOLDER || 'dominate-blog'}/content`,
          `${slug}-content-${i}`
        );
        
        contentImages.push({
          url: uploadedImage.url,
          publicId: uploadedImage.publicId,
        });
        
        // Replace base64 with Cloudinary URL in content
        processedContent = processedContent.replace(base64Data, uploadedImage.url);
      } catch (error) {
        console.error('Error uploading content image:', error);
      }
    }

    // Upload OG image if provided and is base64
    let ogImageData = null;
    if (formData.ogImage && formData.ogImage.startsWith('data:')) {
      const uploadedOgImage = await uploadImage(formData.ogImage, `${process.env.CLOUDINARY_BLOG_FOLDER || 'dominate-blog'}/og-images`);
      ogImageData = {
        url: uploadedOgImage.url,
        publicId: uploadedOgImage.publicId,
      };
    } else if (formData.ogImage) {
      ogImageData = {
        url: formData.ogImage,
        publicId: extractPublicId(formData.ogImage),
      };
    }

    // Upload Twitter image if provided and is base64
    let twitterImageData = null;
    if (formData.twitterImage && formData.twitterImage.startsWith('data:')) {
      const uploadedTwitterImage = await uploadImage(formData.twitterImage, `${process.env.CLOUDINARY_BLOG_FOLDER || 'dominate-blog'}/twitter-images`);
      twitterImageData = {
        url: uploadedTwitterImage.url,
        publicId: uploadedTwitterImage.publicId,
      };
    } else if (formData.twitterImage) {
      twitterImageData = {
        url: formData.twitterImage,
        publicId: extractPublicId(formData.twitterImage),
      };
    }

    // Create blog document
    const blogData = {
      title: formData.title,
      slug: slug,
      content: processedContent,
      excerpt: formData.excerpt || '',
      featuredImage: featuredImageData,
      contentImages: contentImages,
      metaDescription: formData.metaDescription || '',
      metaKeywords: formData.metaKeywords || [],
      focusKeyword: formData.focusKeyword || '',
      canonicalUrl: formData.canonicalUrl || '',
      ogTitle: formData.ogTitle || '',
      ogDescription: formData.ogDescription || '',
      ogImage: ogImageData,
      twitterTitle: formData.twitterTitle || '',
      twitterDescription: formData.twitterDescription || '',
      twitterImage: twitterImageData,
      category: formData.category || '',
      tags: formData.tags || [],
      author: formData.author || 'Admin',
      status: formData.status || 'draft',
      publishDate: formData.publishDate ? new Date(formData.publishDate) : new Date(),
      featured: formData.featured || false,
      allowComments: formData.allowComments !== undefined ? formData.allowComments : true,
    };

    const blog = await Blog.create(blogData);

    return { 
      success: true, 
      message: 'Blog created successfully',
      blogId: blog._id.toString(),
      slug: blog.slug,
    };

  } catch (error) {
    console.error('Error creating blog:', error);
    return { success: false, message: error.message || 'Failed to create blog' };
  }
}

/**
 * Update an existing blog post
 * @param {string} id - Blog ID
 * @param {Object} formData - Updated blog data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function updateBlog(id, formData) {
  try {
    await connectToDB();

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return { success: false, message: 'Blog not found' };
    }

    // Validate required fields
    if (!formData.title || !formData.content) {
      return { success: false, message: 'Title and content are required' };
    }

    // Handle slug update
    let slug = formData.slug || generateSlug(formData.title);
    if (slug !== existingBlog.slug) {
      slug = await ensureUniqueSlug(slug, id);
    }

    // Handle featured image update
    let featuredImageData = existingBlog.featuredImage;
    if (formData.featuredImage && formData.featuredImage !== existingBlog.featuredImage.url) {
      if (formData.featuredImage.startsWith('data:')) {
        // Delete old featured image
        if (existingBlog.featuredImage.publicId) {
          await deleteImage(existingBlog.featuredImage.publicId);
        }
        
        // Upload new featured image
        const uploadedImage = await uploadFeaturedImage(formData.featuredImage, slug);
        featuredImageData = {
          url: uploadedImage.url,
          publicId: uploadedImage.publicId,
          altText: formData.featuredImageAlt || formData.title,
        };
      } else {
        featuredImageData = {
          url: formData.featuredImage,
          publicId: extractPublicId(formData.featuredImage),
          altText: formData.featuredImageAlt || formData.title,
        };
      }
    } else if (formData.featuredImageAlt) {
      featuredImageData.altText = formData.featuredImageAlt;
    }

    // Handle content images
    let processedContent = formData.content;
    const oldContentPublicIds = existingBlog.contentImages.map(img => img.publicId).filter(Boolean);
    const newContentImages = [];
    
    // Upload new base64 images in content
    const base64ImageRegex = /<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g;
    const matches = [...processedContent.matchAll(base64ImageRegex)];
    
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const base64Data = match[1];
      
      try {
        const uploadedImage = await uploadImage(
          base64Data,
          `${process.env.CLOUDINARY_BLOG_FOLDER || 'dominate-blog'}/content`,
          `${slug}-content-${Date.now()}-${i}`
        );
        
        newContentImages.push({
          url: uploadedImage.url,
          publicId: uploadedImage.publicId,
        });
        
        processedContent = processedContent.replace(base64Data, uploadedImage.url);
      } catch (error) {
        console.error('Error uploading content image:', error);
      }
    }
    
    // Extract existing Cloudinary images from new content
    const existingImagesInContent = extractPublicIdsFromHtml(processedContent);
    newContentImages.push(...existingImagesInContent.map(publicId => ({
      url: '', // We don't need URL here
      publicId: publicId,
    })));
    
    // Delete removed images
    const imagesToDelete = oldContentPublicIds.filter(
      oldId => !existingImagesInContent.includes(oldId)
    );
    if (imagesToDelete.length > 0) {
      await deleteImages(imagesToDelete);
    }

    // Handle OG image update
    let ogImageData = existingBlog.ogImage;
    if (formData.ogImage && formData.ogImage !== existingBlog.ogImage?.url) {
      if (formData.ogImage.startsWith('data:')) {
        if (existingBlog.ogImage?.publicId) {
          await deleteImage(existingBlog.ogImage.publicId);
        }
        const uploadedOgImage = await uploadImage(formData.ogImage, `${process.env.CLOUDINARY_BLOG_FOLDER || 'dominate-blog'}/og-images`);
        ogImageData = {
          url: uploadedOgImage.url,
          publicId: uploadedOgImage.publicId,
        };
      } else {
        ogImageData = {
          url: formData.ogImage,
          publicId: extractPublicId(formData.ogImage),
        };
      }
    }

    // Handle Twitter image update
    let twitterImageData = existingBlog.twitterImage;
    if (formData.twitterImage && formData.twitterImage !== existingBlog.twitterImage?.url) {
      if (formData.twitterImage.startsWith('data:')) {
        if (existingBlog.twitterImage?.publicId) {
          await deleteImage(existingBlog.twitterImage.publicId);
        }
        const uploadedTwitterImage = await uploadImage(formData.twitterImage, `${process.env.CLOUDINARY_BLOG_FOLDER || 'dominate-blog'}/twitter-images`);
        twitterImageData = {
          url: uploadedTwitterImage.url,
          publicId: uploadedTwitterImage.publicId,
        };
      } else {
        twitterImageData = {
          url: formData.twitterImage,
          publicId: extractPublicId(formData.twitterImage),
        };
      }
    }

    // Update blog
    const updateData = {
      title: formData.title,
      slug: slug,
      content: processedContent,
      excerpt: formData.excerpt || '',
      featuredImage: featuredImageData,
      contentImages: newContentImages,
      metaDescription: formData.metaDescription || '',
      metaKeywords: formData.metaKeywords || [],
      focusKeyword: formData.focusKeyword || '',
      canonicalUrl: formData.canonicalUrl || '',
      ogTitle: formData.ogTitle || '',
      ogDescription: formData.ogDescription || '',
      ogImage: ogImageData,
      twitterTitle: formData.twitterTitle || '',
      twitterDescription: formData.twitterDescription || '',
      twitterImage: twitterImageData,
      category: formData.category || '',
      tags: formData.tags || [],
      author: formData.author || 'Admin',
      status: formData.status || 'draft',
      publishDate: formData.publishDate ? new Date(formData.publishDate) : existingBlog.publishDate,
      featured: formData.featured !== undefined ? formData.featured : false,
      allowComments: formData.allowComments !== undefined ? formData.allowComments : true,
    };

    await Blog.findByIdAndUpdate(id, updateData);

    return { success: true, message: 'Blog updated successfully' };

  } catch (error) {
    console.error('Error updating blog:', error);
    return { success: false, message: error.message || 'Failed to update blog' };
  }
}

/**
 * Delete a blog post and all associated images
 * @param {string} id - Blog ID
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function deleteBlog(id) {
  try {
    await connectToDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      return { success: false, message: 'Blog not found' };
    }

    // Collect all image public IDs to delete
    const imagesToDelete = [];

    if (blog.featuredImage?.publicId) {
      imagesToDelete.push(blog.featuredImage.publicId);
    }

    if (blog.contentImages && blog.contentImages.length > 0) {
      imagesToDelete.push(...blog.contentImages.map(img => img.publicId).filter(Boolean));
    }

    if (blog.ogImage?.publicId) {
      imagesToDelete.push(blog.ogImage.publicId);
    }

    if (blog.twitterImage?.publicId) {
      imagesToDelete.push(blog.twitterImage.publicId);
    }

    // Delete all images from Cloudinary
    if (imagesToDelete.length > 0) {
      await deleteImages(imagesToDelete);
    }

    // Delete blog from database
    await Blog.findByIdAndDelete(id);

    return { success: true, message: 'Blog deleted successfully' };

  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, message: error.message || 'Failed to delete blog' };
  }
}

/**
 * Get a single blog by ID
 * @param {string} id - Blog ID
 * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
 */
export async function getBlog(id) {
  try {
    await connectToDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      return { success: false, message: 'Blog not found' };
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(blog))
    };

  } catch (error) {
    console.error('Error fetching blog:', error);
    return { success: false, message: error.message || 'Failed to fetch blog' };
  }
}

/**
 * Get a single blog by slug
 * @param {string} slug - Blog slug
 * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
 */
export async function getBlogBySlug(slug) {
  try {
    await connectToDB();

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return { success: false, message: 'Blog not found' };
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(blog))
    };

  } catch (error) {
    console.error('Error fetching blog:', error);
    return { success: false, message: error.message || 'Failed to fetch blog' };
  }
}

/**
 * Get blogs with pagination and filters
 * @param {number} page - Page number (default 1)
 * @param {Object} filters - Filter options
 * @returns {Promise<{success: boolean, data?: Array, pagination?: Object, message?: string}>}
 */
export async function getBlogs(page = 1, filters = {}) {
  try {
    await connectToDB();

    const limit = 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.featured !== undefined) {
      query.featured = filters.featured;
    }

    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    // Get blogs
    const blogs = await Blog.find(query)
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude content for list view

    const total = await Blog.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(blogs)),
      pagination: {
        total,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };

  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { success: false, message: error.message || 'Failed to fetch blogs' };
  }
}

/**
 * Publish a blog (change status to published)
 * @param {string} id - Blog ID
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function publishBlog(id) {
  try {
    await connectToDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      return { success: false, message: 'Blog not found' };
    }

    blog.status = 'published';
    if (!blog.publishDate || blog.publishDate > new Date()) {
      blog.publishDate = new Date();
    }

    await blog.save();

    return { success: true, message: 'Blog published successfully' };

  } catch (error) {
    console.error('Error publishing blog:', error);
    return { success: false, message: error.message || 'Failed to publish blog' };
  }
}

/**
 * Upload a single image (for use in editor)
 * @param {string} base64Data - Base64 image data
 * @param {string} type - Image type ('featured' or 'content')
 * @returns {Promise<{success: boolean, url?: string, publicId?: string, message?: string}>}
 */
export async function uploadBlogImage(base64Data, type = 'content') {
  try {
    if (!base64Data || !base64Data.startsWith('data:')) {
      return { success: false, message: 'Invalid image data' };
    }

    let uploadedImage;
    if (type === 'featured') {
      uploadedImage = await uploadFeaturedImage(base64Data);
    } else {
      uploadedImage = await uploadImage(base64Data, `${process.env.CLOUDINARY_BLOG_FOLDER || 'dominate-blog'}/content`);
    }

    return {
      success: true,
      url: uploadedImage.url,
      publicId: uploadedImage.publicId,
    };

  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, message: error.message || 'Failed to upload image' };
  }
}

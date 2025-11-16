import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {string} base64Data - Base64 encoded image data
 * @param {string} folder - Cloudinary folder path
 * @param {string} filename - Optional filename
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadImage(base64Data, folder = 'dominate-blog/content', filename = null) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary credentials not configured');
    }

    const uploadOptions = {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 1600, crop: 'limit' }, // Max width for content images
        { quality: 'auto:good' },
        { fetch_format: 'auto' }, // WebP for supported browsers
      ],
    };

    if (filename) {
      uploadOptions.public_id = filename;
    }

    const result = await cloudinary.uploader.upload(base64Data, uploadOptions);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

/**
 * Upload featured image with optimized settings
 * @param {string} base64Data - Base64 encoded image data
 * @param {string} filename - Optional filename
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadFeaturedImage(base64Data, filename = null) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('Cloudinary credentials not configured');
    }

    const folder = `${process.env.CLOUDINARY_BLOG_FOLDER || 'dominate-blog'}/featured`;

    const uploadOptions = {
      folder: folder,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 630, crop: 'fill', gravity: 'auto' }, // OG image size
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    };

    if (filename) {
      uploadOptions.public_id = filename;
    }

    const result = await cloudinary.uploader.upload(base64Data, uploadOptions);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary featured image upload error:', error);
    throw new Error(`Failed to upload featured image: ${error.message}`);
  }
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<boolean>}
 */
export async function deleteImage(publicId) {
  try {
    if (!publicId) {
      console.log('No publicId provided for deletion');
      return false;
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.log('Cloudinary not configured - skipping deletion');
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

/**
 * Delete multiple images from Cloudinary
 * @param {string[]} publicIds - Array of Cloudinary public IDs
 * @returns {Promise<{deleted: number, failed: number}>}
 */
export async function deleteImages(publicIds) {
  try {
    if (!publicIds || publicIds.length === 0) {
      return { deleted: 0, failed: 0 };
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.log('Cloudinary not configured - skipping deletion');
      return { deleted: 0, failed: 0 };
    }

    let deleted = 0;
    let failed = 0;

    // Delete images one by one (Cloudinary doesn't support batch delete in free tier)
    for (const publicId of publicIds) {
      const success = await deleteImage(publicId);
      if (success) {
        deleted++;
      } else {
        failed++;
      }
    }

    return { deleted, failed };
  } catch (error) {
    console.error('Cloudinary batch delete error:', error);
    return { deleted: 0, failed: publicIds.length };
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary image URL
 * @returns {string|null}
 */
export function extractPublicId(url) {
  try {
    if (!url || !url.includes('cloudinary.com')) {
      return null;
    }

    // Extract public_id from URL
    // Example: https://res.cloudinary.com/cloud/image/upload/v123456/folder/image.jpg
    const parts = url.split('/upload/');
    if (parts.length < 2) {
      return null;
    }

    const pathParts = parts[1].split('/');
    // Remove version (v123456) if present
    const startIndex = pathParts[0].startsWith('v') ? 1 : 0;
    
    // Join remaining parts and remove extension
    const publicIdWithExt = pathParts.slice(startIndex).join('/');
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '');

    return publicId;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
}

/**
 * Replace an existing image with a new one
 * @param {string} oldPublicId - Public ID of the image to replace
 * @param {string} newBase64Data - Base64 data of the new image
 * @param {string} folder - Cloudinary folder path
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function replaceImage(oldPublicId, newBase64Data, folder = 'dominate-blog/content') {
  try {
    // Upload new image first
    const newImage = await uploadImage(newBase64Data, folder);

    // Delete old image if upload successful
    if (oldPublicId) {
      await deleteImage(oldPublicId);
    }

    return newImage;
  } catch (error) {
    console.error('Error replacing image:', error);
    throw error;
  }
}

/**
 * Extract all Cloudinary image URLs from HTML content
 * @param {string} htmlContent - HTML content with images
 * @returns {string[]} Array of Cloudinary URLs
 */
export function extractCloudinaryUrls(htmlContent) {
  try {
    if (!htmlContent) {
      return [];
    }

    const urlRegex = /https?:\/\/res\.cloudinary\.com\/[^"'\s]+/g;
    const matches = htmlContent.match(urlRegex);
    return matches || [];
  } catch (error) {
    console.error('Error extracting Cloudinary URLs:', error);
    return [];
  }
}

/**
 * Extract public IDs from HTML content
 * @param {string} htmlContent - HTML content with Cloudinary images
 * @returns {string[]} Array of public IDs
 */
export function extractPublicIdsFromHtml(htmlContent) {
  try {
    const urls = extractCloudinaryUrls(htmlContent);
    const publicIds = urls.map(url => extractPublicId(url)).filter(id => id !== null);
    return publicIds;
  } catch (error) {
    console.error('Error extracting public IDs from HTML:', error);
    return [];
  }
}

export default {
  uploadImage,
  uploadFeaturedImage,
  deleteImage,
  deleteImages,
  extractPublicId,
  replaceImage,
  extractCloudinaryUrls,
  extractPublicIdsFromHtml,
};

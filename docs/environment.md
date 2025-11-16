# Environment

Create `.env.local` at the project root.

## Required variables
- MONGODBURL: MongoDB connection string
- JWT_SECRET: Secret for admin JWT
- CLOUDINARY_CLOUD_NAME: Cloudinary cloud name for image hosting
- CLOUDINARY_API_KEY: Cloudinary API key
- CLOUDINARY_API_SECRET: Cloudinary API secret
- CLOUDINARY_BLOG_FOLDER: Folder name for blog images (default: 'dominate-blog')

Example:
```
MONGODBURL=mongodb+srv://user:pass@cluster/db
JWT_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_BLOG_FOLDER=dominate-blog
```

## Notes
- If `MONGODBURL` is missing, `connectToDB` skips connection and contact form storage falls back to a local-success response (see `src/server/actions/userActions.js`).
- Do not commit `.env.local`.

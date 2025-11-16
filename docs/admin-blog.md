# Admin Blog Feature

## Overview
Admin blog management system with rich text editing using Tiptap editor. Allows creating, editing, and managing blog posts with a dark-themed interface matching the DOMINATE brand.

## Features
- Rich text editor with formatting toolbar
- Image upload via drag & drop, paste, or file selection
- Live preview of blog posts
- Blog list with search functionality
- Dark theme matching project styling

## Installation

### Dependencies
Add these packages to your project:
```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-placeholder @tiptap/extension-underline @tiptap/extension-text-align @tiptap/extension-link
```

## File Structure

```
src/
├── components/admin/
│   ├── editor/
│   │   ├── TiptapEditor.tsx       # Main editor component
│   │   ├── EditorToolbar.tsx      # Formatting toolbar
│   │   ├── EditorPreview.tsx      # Preview pane
│   │   ├── extensions.ts          # Tiptap extensions config
│   │   ├── types.ts               # Editor types
│   │   └── editor.css             # Editor-specific styles
│   └── BlogList.tsx               # Admin blog list component
├── app/admin/
│   ├── layout.tsx                 # Admin layout with navigation
│   ├── page.tsx                   # Redirect to blogs
│   └── blogs/
│       ├── page.tsx               # Blog list page
│       ├── new/page.tsx           # Create blog page
│       └── [id]/edit/page.tsx     # Edit blog page
```

## Usage

### Access Admin Panel
Navigate to `/admin` to access the blog management interface.

### Create New Blog Post
1. Go to `/admin/blogs/new`
2. Enter blog title
3. Write content using the rich text editor
4. Use preview mode to see final appearance
5. Save the post

### Edit Existing Blog Post
1. Go to `/admin/blogs`
2. Click the edit icon on any blog post
3. Modify title and/or content
4. Preview changes if needed
5. Update the post

### Editor Features
- **Text Formatting**: Bold, italic, underline
- **Headings**: H1, H2, H3
- **Lists**: Bullet and numbered lists
- **Alignment**: Left, center, right
- **Links**: Add/edit links
- **Images**: Upload via drag & drop, paste, or file selection
- **Quotes**: Blockquotes
- **Code**: Inline and code blocks

### Image Handling
- **Drag & Drop**: Drag images directly into the editor
- **Paste**: Paste images from clipboard
- **File Upload**: Click the image icon in toolbar
- **Storage**: Currently stored as data URLs (client-side only)
- **Future**: Server upload will be implemented in next phase

## Styling

### Editor Theme
- Dark background with white text
- Glass-effect toolbar with hover states
- Custom fonts (Montserrat for body, Oswald for headings)
- Consistent with existing DOMINATE branding

### Preview Styling
- Matches final blog appearance
- Responsive design
- Same typography and colors as live site

## Technical Details

### Tiptap Configuration
The editor uses these extensions:
- StarterKit (basic text editing)
- Image (with custom styling)
- Link (with custom colors)
- Placeholder (for empty state)
- Underline
- TextAlign (for text alignment)

### State Management
- Form state managed with React hooks
- Real-time preview updates
- Client-side validation

### Routing
- `/admin` - Redirects to blog list
- `/admin/blogs` - Blog list page
- `/admin/blogs/new` - Create new blog
- `/admin/blogs/[id]/edit` - Edit existing blog

## Future Enhancements

### Backend Integration
- Blog model and database schema
- Server actions for CRUD operations
- Image upload to server/CDN
- Authentication and authorization

### Additional Features
- Blog categories and tags
- SEO meta fields
- Publishing schedule
- Blog analytics
- Comment management

### UI Improvements
- Auto-save functionality
- Revision history
- Bulk operations
- Advanced search filters

## Troubleshooting

### Common Issues
1. **Images not displaying**: Ensure images are valid formats (jpg, png, gif, webp)
2. **Editor not loading**: Check that all Tiptap dependencies are installed
3. **Preview not updating**: Ensure content is properly synced between editor and preview

### Development Notes
- Images are currently stored as data URLs and will increase content size
- Server-side persistence is not yet implemented
- Authentication is placeholder only
- Delete functionality is mocked

## Dependencies
- `@tiptap/react` - React wrapper for Tiptap
- `@tiptap/starter-kit` - Basic editing features
- `@tiptap/extension-image` - Image support
- `@tiptap/extension-link` - Link support
- `@tiptap/extension-placeholder` - Placeholder text
- `@tiptap/extension-underline` - Underline formatting
- `@tiptap/extension-text-align` - Text alignment
- `lucide-react` - Icons for toolbar and UI

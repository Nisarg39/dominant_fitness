# Public Blog Pages - SEO Implementation Plan

**Date:** November 11, 2025  
**Objective:** Create SEO-optimized public blog pages for maximum crawlability

---

## 🎯 Pages to Build

### 1. Blog List (`/blogs`)
- Published blogs only
- Pagination (10 per page)
- Category filters
- Search functionality
- SEO optimized

### 2. Individual Blog (`/blogs/[slug]`)
- Full blog content
- Dynamic metadata
- JSON-LD structured data
- Breadcrumbs
- Social sharing
- Related posts

---

## 🏗️ File Structure

```
src/
├── app/
│   └── blogs/
│       ├── page.tsx              🆕 List page
│       └── [slug]/
│           └── page.tsx          🆕 Individual blog
├── components/blog/
│   ├── BlogCard.tsx              🆕
│   ├── BlogContent.tsx           🆕
│   ├── BlogJsonLd.tsx            🆕
│   ├── Breadcrumbs.tsx           🆕
│   └── ShareButtons.tsx          🆕
└── lib/seo/
    ├── generateBlogMetadata.ts   🆕
    └── schema.ts                 🆕
```

---

## 🔍 SEO Best Practices (Research-Based)

### Critical Elements
1. **Dynamic Metadata** - Unique per blog
2. **JSON-LD BlogPosting Schema** - Rich snippets
3. **Breadcrumb Schema** - Enhanced search results
4. **Canonical URLs** - Prevent duplicates
5. **Open Graph + Twitter Cards** - Social sharing
6. **Semantic HTML** - h1, article, time tags
7. **Image Alt Text** - Accessibility + SEO
8. **Mobile Responsive** - Mobile-first indexing

### JSON-LD BlogPosting Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Blog Title",
  "image": "featured-image-url",
  "datePublished": "2024-11-11",
  "dateModified": "2024-11-11",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DOMINATE Sport Performance"
  },
  "description": "Meta description",
  "wordCount": 1500,
  "timeRequired": "PT7M"
}
```

---

## 📋 Implementation Phases

### Phase 1: SEO Foundation (30 min)
- [ ] Create `lib/seo/schema.ts` helper
- [ ] Create `lib/seo/generateBlogMetadata.ts`
- [ ] Update sitemap to include blog URLs
- [ ] Add robots.txt (optional)

### Phase 2: Blog List (45 min)
- [ ] Create `app/blogs/page.tsx`
- [ ] Add static metadata
- [ ] Implement pagination
- [ ] Add category filters
- [ ] Create `BlogCard` component
- [ ] Add ISR (revalidate: 60s)

### Phase 3: Individual Blog (60 min)
- [ ] Create `app/blogs/[slug]/page.tsx`
- [ ] Implement `generateMetadata()`
- [ ] Add `generateStaticParams()`
- [ ] Create `BlogJsonLd` component
- [ ] Create `Breadcrumbs` component
- [ ] Create `BlogContent` renderer
- [ ] Add `ShareButtons` component
- [ ] Add `RelatedPosts` component
- [ ] Add ISR (revalidate: 3600s)

### Phase 4: Components (45 min)
- [ ] `BlogHeader` - Hero with featured image
- [ ] `BlogMeta` - Author, date, reading time
- [ ] `BlogContent` - Rich text renderer
- [ ] `ShareButtons` - Social sharing
- [ ] `RelatedPosts` - 3 similar blogs
- [ ] `Breadcrumbs` - Navigation + schema

### Phase 5: Testing (30 min)
- [ ] Google Rich Results Test
- [ ] Schema validator
- [ ] Mobile responsiveness
- [ ] Page speed (Lighthouse)
- [ ] Social sharing previews
- [ ] Sitemap verification

**Total Time: ~3.5 hours**

---

## 🛠️ Key Code Snippets

### Dynamic Metadata Generator
```typescript
// lib/seo/generateBlogMetadata.ts
export async function generateBlogMetadata(slug: string) {
  const result = await getBlogBySlug(slug);
  const blog = result.data;
  
  return {
    title: blog.title,
    description: blog.metaDescription,
    openGraph: {
      title: blog.ogTitle || blog.title,
      images: [blog.featuredImage.url],
      type: 'article',
    },
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
  };
}
```

### Individual Blog Page
```typescript
// app/blogs/[slug]/page.tsx
export async function generateMetadata({ params }) {
  return generateBlogMetadata(params.slug);
}

export async function generateStaticParams() {
  const result = await getBlogs(1, { status: 'published' });
  return result.data.map(blog => ({ slug: blog.slug }));
}

export const revalidate = 3600;

export default async function BlogPage({ params }) {
  const result = await getBlogBySlug(params.slug);
  const blog = result.data;
  
  return (
    <article>
      <BlogJsonLd blog={blog} />
      <Breadcrumbs items={breadcrumbs} />
      <BlogHeader blog={blog} />
      <BlogContent content={blog.content} />
      <ShareButtons url={`/blogs/${blog.slug}`} />
    </article>
  );
}
```

### Updated Sitemap
```typescript
// app/sitemap.ts
export default async function sitemap() {
  const result = await getBlogs(1, { status: 'published', limit: 1000 });
  
  const blogPages = result.data.map(blog => ({
    url: `https://yourdomain.com/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    priority: 0.7,
  }));
  
  return [...staticPages, ...blogPages];
}
```

---

## ✅ SEO Checklist

### Technical SEO
- [x] Dynamic metadata per blog
- [x] Canonical URLs
- [x] BlogPosting JSON-LD
- [x] Breadcrumb schema
- [x] Sitemap with blog URLs
- [x] Robots.txt
- [x] Mobile responsive
- [x] Image optimization

### Content SEO
- [ ] Unique title tags (< 60 chars)
- [ ] Meta descriptions (< 160 chars)
- [ ] H1 tags (one per page)
- [ ] Alt text for images
- [ ] Internal linking
- [ ] Reading time
- [ ] Last modified date

### Social SEO
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Social sharing buttons
- [ ] Author attribution

---

## 🧪 Testing Tools

1. **Google Rich Results Test**  
   https://search.google.com/test/rich-results

2. **Schema Validator**  
   https://validator.schema.org

3. **Lighthouse (Chrome DevTools)**  
   Performance, SEO, Accessibility

4. **Social Media Debuggers**  
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator

5. **Mobile-Friendly Test**  
   https://search.google.com/test/mobile-friendly

---

## 📊 Expected SEO Benefits

### Rich Snippets
- Blog title in large font
- Featured image
- Author name
- Publish date
- Reading time
- Breadcrumb trail

### Search Rankings
- Better crawlability
- Fresh content signals
- Mobile-first optimized
- Fast page loads (Core Web Vitals)
- Structured data bonus

### Social Sharing
- Custom OG images
- Proper titles/descriptions
- Rich cards on Twitter
- Better CTR from social

---

## 🚀 Next Steps

1. Review this plan
2. Confirm approach
3. Start implementation
4. Test each phase
5. Deploy and monitor

**Ready to start building!** 🎯

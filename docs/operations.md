# Operations & Deploy

## Build and run
```bash
npm run build
npm start
```

## Deploy (Vercel recommended)
- Connect repo to Vercel, framework = Next.js
- Environment variables: `MONGODBURL`, `JWT_SECRET`
- Set build command: `next build`
- Output: automatic for Next.js

## Performance & headers
- `next.config.ts` configures image formats, device sizes
- Security/perf headers via `headers()`

## SEO assets
- `layout.tsx` references OpenGraph/Twitter images and icons
- Ensure `/public` contains referenced files (og/twitter images, favicon set)

## Caching
- `sitemap.xml` and `robots.txt` headers set for caching

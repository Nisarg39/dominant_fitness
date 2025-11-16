# Architecture

## Stack
- Next.js 15 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS 4
- Server Actions + Mongoose

## Frontend
- `src/app/layout.tsx`: global metadata, fonts, styles
- `src/app/page.tsx`: home composition
- `src/components/*`: sections and UI
- `src/components/admin/*`: admin dashboard components
  - `editor/`: Tiptap rich text editor module
  - `BlogList.tsx`: blog management list
- `src/app/admin/*`: admin routes and pages
  - Blog CRUD operations (create, edit, list)
- Tailwind config extends fonts via CSS variables

## Backend
- Server actions in `src/server/actions/*`
  - `userActions.js`: `createContactUs`
  - `adminActions.js`: `signInAdmin`, `getContactUs`, `markContactUsAsRead`
- DB config: `src/server/config/mongoose.js`
- Models: `src/server/models/*` (e.g., `contactUs`, `admin`)

## Data flow (example Contact Us)
1. UI submits form
2. Server action `createContactUs` connects DB and writes `ContactUs`
3. Returns success/error to client

## Assets & SEO
- `layout.tsx` defines OpenGraph/Twitter metadata and icons
- Image optimization configured in `next.config.ts`


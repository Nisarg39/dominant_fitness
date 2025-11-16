# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. ENOENT Build Manifest Error (PERMANENT FIX)
```
Error: ENOENT: no such file or directory, open '.next/server/app/page/app-build-manifest.json'
Error: ENOENT: no such file or directory, open '.next/static/development/_buildManifest.js'
```

**Quick Fix (Use npm scripts):**
```bash
# Light cleanup
npm run clean
npm run dev

# Medium cleanup  
npm run fresh

# Full reset (nuclear option)
npm run reset
```

**Manual Fix:**
```bash
# Use the provided script
./fix-cache.sh

# Or for full reset
./fix-cache.sh --full-reset
```

**Why this happens:**
- Next.js cache corruption with Turbopack
- Interrupted builds leaving partial files
- Version conflicts between dependencies

### 2. CSS Parsing Errors
```
@import rules must precede all rules aside from @charset and @layer statements
```

**Solution:**
- All `@import` statements must be at the top of CSS files
- Use Next.js font loading instead of CSS imports for Google Fonts

### 3. Font Loading Issues
**Solution:**
- Fonts are loaded via Next.js in `layout.tsx`
- Use Tailwind classes: `font-montserrat`, `font-caveat`, etc.
- Check `tailwind.config.ts` for font configurations

### 4. TypeScript Errors
**Solution:**
```bash
# Check for type errors
npm run build

# Fix path aliases in tsconfig.json if needed
```

### 5. Module Not Found Errors
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 🚀 Quick Reset Commands

```bash
# Full reset
rm -rf .next node_modules package-lock.json
npm install
npm run build
npm run dev
```

## 📝 Development Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```
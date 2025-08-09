#!/bin/bash

# DOMINATE Next.js Cache Fix Script
# Run this whenever you encounter ENOENT build manifest errors

echo "🔧 Fixing Next.js cache issues..."

# Stop any running development servers
echo "Stopping any running Next.js processes..."
pkill -f "next" 2>/dev/null || true

# Remove all cache and build files
echo "Removing cache files..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.next
rm -rf .turbo

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force 2>/dev/null || true

# Reinstall dependencies if node_modules is corrupted
if [ "$1" = "--full-reset" ]; then
    echo "Performing full reset..."
    rm -rf node_modules
    rm -f package-lock.json
    npm install
fi

# Rebuild the project
echo "Building project..."
npm run build

echo "✅ Cache fix complete!"
echo "You can now run: npm run dev"
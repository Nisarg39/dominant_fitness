# DOMINATE Performance - Project Context

## Project Overview
**Name:** DOMINATE Performance Website  
**Type:** Next.js 15.4.5 Sports Performance Training Website  
**Domain:** Elite sports performance training and coaching  
**Target Audience:** Athletes of all levels seeking professional training  

## Business Context
- **Mission:** Close the performance gap in Indian sport through evidence-based training
- **Certification:** UKSCA (UK Strength & Conditioning Association) certified coaching
- **Approach:** Data-driven coaching with global standards of sport science
- **Values:** Accessible, inclusive, scientifically-driven methodologies

## Technical Architecture

### Core Stack
- **Framework:** Next.js 15.4.5 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber, OGL
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT

### Project Structure
```
src/
├── app/
│   ├── layout.tsx (Root layout with metadata & fonts)
│   ├── page.tsx (Main homepage)
│   ├── globals.css (Global styles + Tailwind)
│   ├── admin/ (Admin dashboard)
│   └── api/ (API routes)
├── components/
│   ├── Navigation.tsx (Responsive navigation)
│   ├── HeroSection.tsx (Main hero with animations)
│   ├── AboutSection.tsx (About content)
│   ├── Services.tsx (Services grid)
│   ├── HowToDominate.tsx (Process explanation)
│   ├── Testimonials.tsx (Client testimonials)
│   ├── ContacUs.tsx (Contact form)
│   ├── animatedComponents/ (3D animations)
│   └── adminComponents/ (Admin interface)
├── hooks/
│   ├── useCustomCursor.ts (Custom cursor logic)
│   └── useScrollAnimation.ts (Scroll animations)
├── server/
│   ├── models/ (MongoDB models)
│   ├── actions/ (Server actions)
│   └── config/ (Database config)
└── utils/ (Utility functions)
```

## Key Features

### Frontend Features
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Custom Animations:** Framer Motion for smooth transitions
- **3D Graphics:** Three.js for interactive elements
- **Custom Cursor:** Desktop-only custom cursor system
- **Video Background:** Athlete training footage
- **Typography:** Multiple custom fonts (Montserrat, Oswald, Rajdhani, Caveat)

### Admin Features
- **Admin Dashboard:** User management and analytics
- **Contact Management:** Handle contact form submissions
- **Content Management:** Update website content

### SEO & Performance
- **Metadata:** Comprehensive SEO optimization
- **Structured Data:** Schema.org markup
- **Performance:** Optimized images and lazy loading
- **Accessibility:** WCAG compliant design

## Current State

### Completed Components
- ✅ Navigation with smooth scrolling
- ✅ Hero section with mask reveal animation
- ✅ Services section with grid layout
- ✅ About section with content
- ✅ How to Dominate process explanation
- ✅ Testimonials carousel
- ✅ Contact form
- ✅ Admin dashboard structure

### Technical Debt
- Some components need optimization
- Admin functionality needs completion
- API routes need implementation
- Database models need refinement

## Coding Standards

### TypeScript
- Use strict type checking
- Define interfaces for all props
- Use proper type annotations
- Avoid `any` types

### React/Next.js
- Use functional components with hooks
- Implement proper error boundaries
- Use Next.js Image component for images
- Follow App Router patterns

### Styling
- Use Tailwind CSS utility classes
- Maintain consistent spacing and colors
- Implement responsive design patterns
- Use CSS custom properties for theming

### Component Structure
- Single responsibility principle
- Proper prop interfaces
- Clean component composition
- Reusable utility functions

## Performance Considerations
- Optimize images with Next.js Image
- Implement lazy loading for heavy components
- Use React.memo for expensive components
- Minimize bundle size with proper imports
- Implement proper caching strategies

## Security Considerations
- Validate all user inputs
- Sanitize data before database operations
- Implement proper authentication
- Use environment variables for secrets
- Follow Next.js security best practices

## Development Workflow
1. **Analysis:** Understand requirements and current state
2. **Architecture:** Design solution structure
3. **Implementation:** Code following established patterns
4. **Quality Assurance:** Test and review implementation

## Context Retention Rules
- Always maintain awareness of project structure
- Follow established coding patterns
- Keep track of component relationships
- Document architectural decisions
- Maintain consistency across all files

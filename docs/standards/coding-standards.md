# Coding Standards - DOMINATE Performance

## TypeScript Standards

### 1. Type Definitions
```typescript
// ✅ Good: Explicit interface definitions
interface UserProps {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// ❌ Bad: Using any type
const user: any = { id: 1, name: 'John' };

// ✅ Good: Proper type annotations
const handleSubmit = (data: FormData): Promise<void> => {
  // implementation
};
```

### 2. Component Props
```typescript
// ✅ Good: Properly typed component props
interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundVideo?: string;
  onScroll?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundVideo,
  onScroll
}) => {
  // component implementation
};
```

### 3. Hook Types
```typescript
// ✅ Good: Typed custom hooks
interface UseCustomCursorReturn {
  cursorRef: React.RefObject<HTMLDivElement>;
  handleMouseMove: (e: MouseEvent) => void;
  isHovering: boolean;
}

const useCustomCursor = (): UseCustomCursorReturn => {
  // hook implementation
};
```

## React/Next.js Standards

### 1. Component Structure
```typescript
// ✅ Good: Clean component structure
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  // prop types
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 1. State declarations
  const [state, setState] = useState<StateType>(initialValue);
  
  // 2. Effect hooks
  useEffect(() => {
    // effect logic
  }, [dependencies]);
  
  // 3. Event handlers
  const handleEvent = (e: React.MouseEvent) => {
    // handler logic
  };
  
  // 4. Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="component-class"
    >
      {/* JSX content */}
    </motion.div>
  );
};

export default Component;
```

### 2. File Naming Conventions
```
// ✅ Good: PascalCase for components
Navigation.tsx
HeroSection.tsx
AboutSection.tsx

// ✅ Good: camelCase for hooks and utilities
useCustomCursor.ts
useScrollAnimation.ts
formatDate.ts

// ✅ Good: kebab-case for pages
contact-us/
about-us/
admin-dashboard/
```

### 3. Import Organization
```typescript
// ✅ Good: Organized imports
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Next.js imports
import Image from 'next/image';
import Link from 'next/link';

// 3. Third-party libraries
import { motion } from 'framer-motion';
import { cn } from 'clsx';

// 4. Internal imports
import { Button } from '@/components/ui/Button';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import { formatDate } from '@/utils/formatDate';

// 5. Type imports
import type { ComponentProps } from '@/types/ComponentProps';
```

## Styling Standards

### 1. Tailwind CSS Usage
```typescript
// ✅ Good: Semantic class organization
<div className="
  flex flex-col items-center justify-center
  min-h-screen bg-black text-white
  px-4 py-8 md:px-8 lg:px-16
  transition-all duration-300 ease-in-out
">
  {/* content */}
</div>

// ❌ Bad: Inline styles mixed with classes
<div 
  className="flex items-center"
  style={{ backgroundColor: '#000', color: '#fff' }}
>
  {/* content */}
</div>
```

### 2. Responsive Design
```typescript
// ✅ Good: Mobile-first responsive design
<div className="
  text-sm md:text-base lg:text-lg xl:text-xl
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-4 md:gap-6 lg:gap-8
">
  {/* content */}
</div>
```

### 3. Animation Classes
```typescript
// ✅ Good: Consistent animation patterns
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  className="transform transition-transform duration-300 hover:scale-105"
>
  {/* content */}
</motion.div>
```

## Component Standards

### 1. Single Responsibility
```typescript
// ✅ Good: Single responsibility component
const ContactForm = () => {
  // Only handles contact form logic
  return (
    <form>
      {/* form fields */}
    </form>
  );
};

// ❌ Bad: Multiple responsibilities
const ContactForm = () => {
  // Handles form, validation, API calls, and UI
  // Too many responsibilities
};
```

### 2. Prop Drilling Prevention
```typescript
// ✅ Good: Using Context for shared state
const AppContext = createContext<AppContextType | null>(null);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// ❌ Bad: Prop drilling
const Parent = () => {
  const [state, setState] = useState();
  return <Child state={state} setState={setState} />;
};
```

### 3. Error Boundaries
```typescript
// ✅ Good: Error boundary implementation
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

## Performance Standards

### 1. Memoization
```typescript
// ✅ Good: Memoizing expensive components
const ExpensiveComponent = React.memo<Props>(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => processItem(item));
  }, [data]);

  return <div>{/* render processed data */}</div>;
});

// ✅ Good: Memoizing callbacks
const Parent = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return <Child onClick={handleClick} />;
};
```

### 2. Lazy Loading
```typescript
// ✅ Good: Lazy loading heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
};
```

### 3. Image Optimization
```typescript
// ✅ Good: Using Next.js Image component
import Image from 'next/image';

const OptimizedImage = () => {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority
      className="w-full h-auto"
    />
  );
};
```

## Testing Standards

### 1. Component Testing
```typescript
// ✅ Good: Component test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Hook Testing
```typescript
// ✅ Good: Custom hook testing
import { renderHook, act } from '@testing-library/react';
import { useCustomCursor } from './useCustomCursor';

describe('useCustomCursor', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCustomCursor());
    
    expect(result.current.isHovering).toBe(false);
    expect(result.current.cursorRef.current).toBeNull();
  });
});
```

## Documentation Standards

### 1. Component Documentation
```typescript
/**
 * HeroSection component displays the main hero section with animations
 * 
 * @param title - The main title text
 * @param subtitle - The subtitle text
 * @param backgroundVideo - Optional background video URL
 * @param onScroll - Optional scroll callback function
 */
interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundVideo?: string;
  onScroll?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundVideo,
  onScroll
}) => {
  // implementation
};
```

### 2. Function Documentation
```typescript
/**
 * Formats a date string into a readable format
 * 
 * @param date - The date string to format
 * @param format - The desired format (default: 'MMM DD, YYYY')
 * @returns Formatted date string
 * 
 * @example
 * formatDate('2024-01-15', 'MMM DD, YYYY') // Returns 'Jan 15, 2024'
 */
const formatDate = (date: string, format: string = 'MMM DD, YYYY'): string => {
  // implementation
};
```

## Code Review Checklist

### Before Submitting Code
- [ ] TypeScript types are properly defined
- [ ] Components follow single responsibility principle
- [ ] Props are properly typed and documented
- [ ] Error handling is implemented
- [ ] Performance optimizations are applied
- [ ] Code is properly formatted and linted
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Accessibility requirements are met
- [ ] Mobile responsiveness is verified

### Code Quality Metrics
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Test coverage > 80%
- [ ] Bundle size is optimized
- [ ] Performance metrics are acceptable
- [ ] Accessibility score > 90%

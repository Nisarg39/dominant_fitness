'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  author?: string;
  position?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    title: "Championship Mindset",
    description: "This program transformed my mental game completely. I went from doubting my abilities to dominating every competition. The performance strategies taught here are game-changing for any serious athlete.",
    backgroundImage: "https://c4.wallpaperflare.com/wallpaper/303/734/476/kobe-bryant-nba-sports-wallpaper-preview.jpg",
    author: "Marcus Thompson",
    position: "Professional Basketball Player, NBA"
  },
  {
    id: 2,
    title: "Elite Performance",
    description: "The training methodology here is unlike anything I've experienced. My speed, agility, and overall athletic performance have reached levels I never thought possible. This is what domination looks like.",
    backgroundImage: "https://static.vecteezy.com/system/resources/thumbnails/066/315/783/small/dynamic-athlete-sprinting-on-an-illuminated-field-during-a-high-stakes-match-in-early-evening-hours-photo.jpeg",
    author: "Sarah Chen",
    position: "Olympic Track & Field Athlete"
  },
  {
    id: 3,
    title: "Victory Redefined",
    description: "From average to exceptional - that's the transformation I experienced. The systematic approach to performance enhancement gave me the edge I needed to dominate my sport at the highest level.",
    backgroundImage: "https://wallpaperbat.com/img/583009-wallpaper.jpg",
    author: "James Rodriguez",
    position: "Professional Soccer Player"
  },
  {
    id: 4,
    title: "Peak Performance",
    description: "The mental and physical training protocols here are revolutionary. I've achieved personal bests in every metric since implementing these strategies. This is what separates champions from the rest.",
    backgroundImage: "https://4kwallpapers.com/images/walls/thumbs_2t/16371.jpeg",
    author: "Alexandra Williams",
    position: "Professional Tennis Player"
  },
  {
    id: 5,
    title: "Dominate The Field",
    description: "Every aspect of my game improved dramatically. The comprehensive approach to athletic development gave me the tools to consistently outperform my competition and achieve championship-level results.",
    backgroundImage: "https://st4.depositphotos.com/1000689/29008/i/450/depositphotos_290088852-stock-photo-american-football-sportsman-player-in.jpg",
    author: "Michael Davis",
    position: "Professional Football Player"
  },
  {
    id: 6,
    title: "Champion's Journey",
    description: "This program doesn't just train athletes - it creates champions. The transformation in my performance has been remarkable. I've learned what it truly means to dominate in competitive sports.",
    backgroundImage: "https://img.freepik.com/premium-photo/athlete-man-throwing-discus-against-black-background_1134-3574.jpg",
    author: "Elena Petrov",
    position: "Professional Track & Field Athlete"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState(testimonials);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
    
    // Move first item to end with animation
    setTimeout(() => {
      setItems(prev => {
        const newItems = [...prev];
        const firstItem = newItems.shift()!;
        newItems.push(firstItem);
        return newItems;
      });
      setIsAnimating(false);
    }, 50); // Small delay to trigger CSS transition
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    
    // Move last item to beginning with animation
    setTimeout(() => {
      setItems(prev => {
        const newItems = [...prev];
        const lastItem = newItems.pop()!;
        newItems.unshift(lastItem);
        return newItems;
      });
      setIsAnimating(false);
    }, 50); // Small delay to trigger CSS transition
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const styles = {
    container: {
      position: 'relative' as const,
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
      borderRadius: '0',
    },
    slider: {
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      listStyle: 'none' as const,
    },
    item: {
      position: 'absolute' as const,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      borderRadius: '20px',
      boxShadow: '0 20px 30px rgba(255,255,255,0.3) inset',
      transition: 'all 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundImage: '',
      width: '200px',
      height: '300px',
      left: '',
      willChange: 'transform, left, width, height, opacity',
    },
    itemActive: {
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      transform: 'none',
      borderRadius: '0',
      boxShadow: 'none',
      opacity: 1,
      zIndex: 2,
      position: 'absolute' as const,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
    itemSecondary: {
      width: '200px',
      height: '300px',
    },
    content: {
      width: 'min(30vw, 400px)',
      position: 'absolute' as const,
      top: '50%',
      left: '3rem',
      transform: 'translateY(-50%)',
      fontFamily: 'helvetica, sans-serif',
      color: 'white',
      textShadow: '0 3px 8px rgba(0,0,0,0.5)',
      opacity: 1,
      display: 'block',
      zIndex: 10,
    },
    contentActive: {
      display: 'block',
      animation: 'show 0.75s ease-in-out 0.3s forwards',
    },
    title: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
      letterSpacing: '0.08em',
      marginBottom: '0.8rem',
      color: '#ca2f2e',
      textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.7), 0 0 20px rgba(202,47,46,0.3)',
      textDecoration: 'underline',
      textDecorationColor: '#ca2f2e',
      textUnderlineOffset: '4px',
      textDecorationThickness: '2px',
    },
    description: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontWeight: 400,
      lineHeight: '1.6',
      margin: '1.2rem 0 1.8rem',
      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
      color: 'rgba(255,255,255,0.95)',
      textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6)',
    },
    button: {
      width: 'fit-content',
      backgroundColor: 'rgba(0,0,0,0.1)',
      color: 'white',
      border: '2px solid white',
      borderRadius: '0.25rem',
      padding: '0.75rem',
      cursor: 'pointer',
      fontSize: '0.8rem',
    },
    author: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
      fontWeight: 600,
      color: '#ca2f2e',
      marginTop: '1.2rem',
      textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 10px rgba(202,47,46,0.4)',
      letterSpacing: '0.02em',
    },
    position: {
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)',
      fontWeight: 400,
      color: 'rgba(255,255,255,0.85)',
      opacity: 0.9,
      textShadow: '0 1px 2px rgba(0,0,0,0.7)',
    },
    nav: {
      position: 'absolute' as const,
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 5,
      userSelect: 'none' as const,
      display: 'flex',
      gap: '0.5rem',
    },
    navButton: {
      backgroundColor: 'rgba(255,255,255,0.5)',
      color: 'rgba(0,0,0,0.7)',
      border: '2px solid rgba(0,0,0,0.6)',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      transition: 'background-color 0.3s ease',
    },
  };

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 650);
      setIsSmallMobile(width <= 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Add keyframes for animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes show {
        0% {
          filter: blur(5px);
          transform: translateY(calc(-50% + 75px));
        }
        100% {
          opacity: 1;
          filter: blur(0);
        }
      }
      
      @keyframes slideInFromRight {
        0% {
          transform: translateY(-50%) scale(0.8);
          opacity: 0;
          left: calc(50% + 880px);
        }
        100% {
          transform: translateY(-50%) scale(1);
          opacity: 1;
          left: calc(50% + 660px);
        }
      }
      
      @keyframes slideOutToLeft {
        0% {
          transform: translateY(-50%) scale(1);
          opacity: 1;
          left: 0;
          width: 100%;
          height: 100%;
        }
        100% {
          transform: translateY(-50%) scale(0.8);
          opacity: 0;
          left: -100%;
          width: 200px;
          height: 300px;
        }
      }
      
      @keyframes moveToActive {
        0% {
          left: 50%;
          width: 200px;
          height: 300px;
          transform: translateY(-50%);
          opacity: 1;
        }
        100% {
          left: 0;
          width: 100%;
          height: 100%;
          transform: none;
          opacity: 1;
        }
      }
      
      @keyframes moveFromActive {
        0% {
          left: 0;
          width: 100%;
          height: 100%;
          transform: none;
          opacity: 1;
        }
        100% {
          left: calc(50% + 440px);
          width: 200px;
          height: 300px;
          transform: translateY(-50%);
          opacity: 1;
        }
      }
      
      .testimonial-item {
        transition: all 0.75s cubic-bezier(0.4, 0, 0.2, 1) !important;
        will-change: transform, left, width, height, opacity;
      }
      
      .testimonial-item:hover {
        transform: translateY(-50%) scale(1.02);
      }
      
      @media (width > 650px) and (width < 900px) {
        .testimonial-item {
          width: 160px !important;
          height: 270px !important;
        }
        .testimonial-item:nth-child(3) { left: 50% !important; }
        .testimonial-item:nth-child(4) { left: calc(50% + 170px) !important; }
        .testimonial-item:nth-child(5) { left: calc(50% + 340px) !important; }
        .testimonial-item:nth-child(6) { left: calc(50% + 510px) !important; opacity: 0 !important; }
        .testimonial-content .title { font-size: 1rem !important; }
        .testimonial-content .description { font-size: 0.7rem !important; }
        .testimonial-content button { font-size: 0.7rem !important; }
        .testimonial-content { width: min(40vw, 350px) !important; left: 2rem !important; }
      }
      
      @media (width <= 650px) {
        .testimonial-item {
          width: 130px !important;
          height: 220px !important;
        }
        .testimonial-item:nth-child(1) {
          left: 0 !important;
          top: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          transform: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          opacity: 1 !important;
          z-index: 2 !important;
          position: absolute !important;
          background-position: center !important;
          background-size: cover !important;
        }
        .testimonial-item:nth-child(2) {
          width: 130px !important;
          height: 220px !important;
        }
        .testimonial-item:nth-child(3) { left: 50% !important; }
        .testimonial-item:nth-child(4) { left: calc(50% + 140px) !important; }
        .testimonial-item:nth-child(5) { left: calc(50% + 280px) !important; }
        .testimonial-item:nth-child(6) { left: calc(50% + 420px) !important; opacity: 0 !important; }
        .testimonial-content .title { font-size: 0.9rem !important; }
        .testimonial-content .description { font-size: 0.65rem !important; }
        .testimonial-content button { font-size: 0.7rem !important; }
        .testimonial-content { 
          width: min(45vw, 280px) !important; 
          left: 1rem !important; 
          top: 50% !important;
          transform: translateY(-50%) !important;
          z-index: 10 !important;
          position: absolute !important;
        }
        .testimonial-content .author { font-size: 0.8rem !important; }
        .testimonial-content .position { font-size: 0.7rem !important; }
      }
      
      @media (width <= 480px) {
        .testimonial-item {
          width: 100px !important;
          height: 180px !important;
        }
        .testimonial-item:nth-child(1) {
          left: 0 !important;
          top: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          transform: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          opacity: 1 !important;
          z-index: 2 !important;
          position: absolute !important;
          background-position: center !important;
          background-size: cover !important;
        }
        .testimonial-item:nth-child(2) {
          width: 100px !important;
          height: 180px !important;
        }
        .testimonial-item:nth-child(3) { left: 50% !important; }
        .testimonial-item:nth-child(4) { left: calc(50% + 110px) !important; }
        .testimonial-item:nth-child(5) { left: calc(50% + 220px) !important; }
        .testimonial-item:nth-child(6) { left: calc(50% + 330px) !important; opacity: 0 !important; }
        .testimonial-content .title { font-size: 0.8rem !important; }
        .testimonial-content .description { font-size: 0.6rem !important; line-height: 1.5 !important; }
        .testimonial-content button { font-size: 0.6rem !important; padding: 0.5rem !important; }
        .testimonial-content { 
          width: min(55vw, 220px) !important; 
          left: 0.5rem !important; 
          top: 50% !important;
          transform: translateY(-50%) !important;
          z-index: 10 !important;
          position: absolute !important;
        }
        .testimonial-content .author { font-size: 0.7rem !important; }
        .testimonial-content .position { font-size: 0.6rem !important; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getItemStyle = (index: number) => {
    const baseStyle = {
      ...styles.item,
      backgroundImage: `url(${items[index].backgroundImage})`,
    };

    if (index === 0) {
      // Active item - full screen
      if (isSmallMobile) {
        return {
          ...baseStyle,
          left: '0',
          top: '0',
          width: '100vw',
          height: '100vh',
          transform: 'none',
          borderRadius: '0',
          boxShadow: 'none',
          opacity: 1,
          zIndex: 2,
          position: 'absolute' as const,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        };
      } else if (isMobile) {
        return {
          ...baseStyle,
          left: '0',
          top: '0',
          width: '100vw',
          height: '100vh',
          transform: 'none',
          borderRadius: '0',
          boxShadow: 'none',
          opacity: 1,
          zIndex: 2,
          position: 'absolute' as const,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        };
      } else {
        return { ...baseStyle, ...styles.itemActive };
      }
    } else if (index === 1) {
      // Second item
      if (isSmallMobile) {
        return { 
          ...baseStyle, 
          width: '100px',
          height: '180px',
          left: '50%' 
        };
      } else if (isMobile) {
        return { 
          ...baseStyle, 
          width: '130px',
          height: '220px',
          left: '50%' 
        };
      } else {
        return { 
          ...baseStyle, 
          ...styles.itemSecondary, 
          left: '50%' 
        };
      }
    } else if (index === 2) {
      if (isSmallMobile) {
        return { 
          ...baseStyle, 
          width: '100px',
          height: '180px',
          left: 'calc(50% + 110px)' 
        };
      } else if (isMobile) {
        return { 
          ...baseStyle, 
          width: '130px',
          height: '220px',
          left: 'calc(50% + 140px)' 
        };
      } else {
        return { 
          ...baseStyle, 
          ...styles.itemSecondary, 
          left: 'calc(50% + 220px)' 
        };
      }
    } else if (index === 3) {
      if (isSmallMobile) {
        return { 
          ...baseStyle, 
          width: '100px',
          height: '180px',
          left: 'calc(50% + 220px)' 
        };
      } else if (isMobile) {
        return { 
          ...baseStyle, 
          width: '130px',
          height: '220px',
          left: 'calc(50% + 280px)' 
        };
      } else {
        return { 
          ...baseStyle, 
          ...styles.itemSecondary, 
          left: 'calc(50% + 440px)' 
        };
      }
    } else if (index === 4) {
      if (isSmallMobile) {
        return { 
          ...baseStyle, 
          width: '100px',
          height: '180px',
          left: 'calc(50% + 330px)', 
          opacity: 0 
        };
      } else if (isMobile) {
        return { 
          ...baseStyle, 
          width: '130px',
          height: '220px',
          left: 'calc(50% + 420px)', 
          opacity: 0 
        };
      } else {
        return { 
          ...baseStyle, 
          ...styles.itemSecondary, 
          left: 'calc(50% + 660px)', 
          opacity: 0 
        };
      }
    }
    
    return { ...baseStyle, ...styles.itemSecondary, left: 'calc(50% + 880px)', opacity: 0 };
  };

  const getContentStyle = (index: number) => {
    let contentStyle = { ...styles.content };
    
    // Apply mobile-specific styles based on screen size
    if (isSmallMobile) {
      contentStyle = {
        ...contentStyle,
        width: 'min(55vw, 220px)',
        left: '0.5rem',
      };
    } else if (isMobile) {
      contentStyle = {
        ...contentStyle,
        width: 'min(45vw, 280px)',
        left: '1rem',
      };
    }
    
    return index === 1 ? { ...contentStyle, ...styles.contentActive } : contentStyle;
  };

  return (
    <main 
      id="testimonials-section"
      style={styles.container}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <ul style={styles.slider}>
        {items.map((testimonial, index) => (
          <li
            key={testimonial.id}
            className="testimonial-item"
            style={getItemStyle(index)}
          >
          </li>
        ))}
      </ul>
      
      {/* Content overlay positioned on the left side of the carousel */}
      <div 
        className="testimonial-content"
        style={getContentStyle(1)}
      >
        <h2 style={styles.title}>{items[0].title}</h2>
        <p style={styles.description}>{items[0].description}</p>
        {items[0].author && (
          <div style={styles.author}>{items[0].author}</div>
        )}
        {items[0].position && (
          <div style={styles.position}>{items[0].position}</div>
        )}
      </div>
      
      <nav style={styles.nav}>
        <button
          style={styles.navButton}
          onClick={handlePrev}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
          }}
        >
          ←
        </button>
        <button
          style={styles.navButton}
          onClick={handleNext}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
          }}
        >
          →
        </button>
      </nav>
    </main>
  );
}
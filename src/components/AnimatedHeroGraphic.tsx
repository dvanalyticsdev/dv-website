import React, { useState, useEffect, useRef } from 'react';

const slideshowImages = [
  '/hero-stories/career-gap.png',
];

const SLIDE_DURATION = 2000; // 2.0 seconds per slide (speeded up)

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface AnimatedHeroGraphicProps {
  images?: string[];
  priority?: boolean;
}

export const AnimatedHeroGraphic: React.FC<AnimatedHeroGraphicProps> = ({
  images: propImages,
  priority = false,
}) => {
  // Keep the first image deterministic for fast initial LCP, shuffle the remaining slides
  const [images] = useState(() => {
    const source = (propImages && propImages.length > 0 ? propImages : slideshowImages).filter(Boolean);
    if (source.length <= 2) return source;
    return [source[0], ...shuffleArray(source.slice(1))];
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setHasAdvanced(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  const handlePrev = () => {
    setHasAdvanced(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setHasAdvanced(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || images.length <= 1) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50; // pixels

    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const nextIndex = images.length > 1 ? (currentIndex + 1) % images.length : 0;

  return (
    <div 
      className="hero-slideshow-card"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slideshow Content */}
      <div className="slideshow-slides-viewport">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const shouldRenderImage = isActive || (hasAdvanced && index === nextIndex);
          return (
            <div 
              key={image || index} 
              className={`slideshow-slide ${isActive ? 'active' : ''}`}
            >
              {shouldRenderImage && (
                <img
                  src={image}
                  alt={`DV Analytics Learner Success Story ${index + 1}`}
                  className="slide-image-foreground"
                  width="640"
                  height="640"
                  loading={priority && index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={priority && index === 0 ? 'high' : 'low'}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <button 
            className="slideshow-nav-btn prev-btn" 
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="slideshow-nav-btn next-btn" 
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

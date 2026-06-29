import React, { useState, useEffect, useRef } from 'react';

const slideshowImages = [
  '/hero-stories/WhatsApp Image 2026-06-25 at 3.35.12 PM (1).jpeg',
  '/hero-stories/WhatsApp Image 2026-06-25 at 3.35.12 PM.jpeg',
  '/hero-stories/WhatsApp Image 2026-06-25 at 3.35.13 PM.jpeg',
  '/hero-stories/WhatsApp Image 2026-06-25 at 3.35.14 PM.jpeg',
  '/hero-stories/WhatsApp Image 2026-06-25 at 3.35.15 PM.jpeg',
  '/hero-stories/WhatsApp Image 2026-06-25 at 3.35.16 PM.jpeg',
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
}

export const AnimatedHeroGraphic: React.FC<AnimatedHeroGraphicProps> = ({ images: propImages }) => {
  const [images] = useState(() => shuffleArray(propImages || slideshowImages));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const threshold = 50; // pixels

    if (diffX > threshold) {
      handleNext();
    } else if (diffX < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
  };

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
          return (
            <div 
              key={index} 
              className={`slideshow-slide ${isActive ? 'active' : ''}`}
            >
              <img
                src={image}
                alt={`Hero Story ${index + 1}`}
                className="slide-image-foreground"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
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
    </div>
  );
};

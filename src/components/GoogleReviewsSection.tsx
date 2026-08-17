import React, { useState, useEffect, useRef, useCallback } from 'react';
import { googleReviewsData, GOOGLE_REVIEWS_LINK } from '../data/googleReviewsData';

export const GoogleReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalReviews = googleReviewsData.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Auto rotation interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleCardClick = () => {
    window.open(GOOGLE_REVIEWS_LINK, '_blank', 'noopener,noreferrer');
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className="star-icon"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill={i < rating ? "#f59e0b" : "#e2e8f0"}
        stroke={i < rating ? "#d97706" : "#cbd5e1"}
        strokeWidth="1"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  // Generate loop array so carousel rotates seamlessly
  const visibleCards = [];
  for (let i = 0; i < 5; i++) {
    const idx = (currentIndex + i) % totalReviews;
    visibleCards.push({ ...googleReviewsData[idx], uniqueKey: `${googleReviewsData[idx].id}-${i}` });
  }

  return (
    <section className="google-reviews-section reveal-on-scroll" id="reviews">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
          <span className="section-subtitle">STUDENT TESTIMONIALS</span>
          <h2 className="section-title">Verified Google Reviews</h2>
          <div className="section-title-divider"></div>
        </div>

        {/* Auto-Rotating Reviews Carousel Container */}
        <div
          className="carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Secondary Left Navigation Arrow */}
          <button
            className="carousel-nav-btn prev-btn"
            onClick={prevSlide}
            aria-label="Previous Review"
            title="Previous Review"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Carousel Track */}
          <div className="carousel-viewport">
            <div className="carousel-track">
              {visibleCards.map((review) => (
                <div
                  key={review.uniqueKey}
                  className="carousel-card"
                  onClick={handleCardClick}
                  title="Click to view on Google Reviews"
                >
                  <div className="card-header">
                    <div className="user-profile">
                      <div className="user-avatar" style={{ backgroundColor: review.avatarBg }}>
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-info">
                        <div className="user-name-line">
                          <h4 className="user-name">{review.name}</h4>
                          {review.isLocalGuide && (
                            <span className="guide-pill">Local Guide</span>
                          )}
                        </div>
                        {review.details && <span className="user-details">{review.details}</span>}
                      </div>
                    </div>

                    <div className="google-icon-tag" title="Verified Google Review">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="card-rating-line">
                    <div className="stars-box">{renderStars(review.rating)}</div>
                    <span className="card-date">{review.date}</span>
                  </div>

                  <div className="card-body">
                    {review.text.split('\n').map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>

                  <div className="card-link">
                    <span>Read on Google</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Right Navigation Arrow */}
          <button
            className="carousel-nav-btn next-btn"
            onClick={nextSlide}
            aria-label="Next Review"
            title="Next Review"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

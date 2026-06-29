import React, { useState } from 'react';

const shuffleImages = (images: string[]) => {
  const shuffled = [...images];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

export const SuccessStories: React.FC = () => {
  const successImages = [
    "WhatsApp Image 2026-06-25 at 5.01.01 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.01 PM.jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.02 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.02 PM (2).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.02 PM.jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.03 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.03 PM (2).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.03 PM.jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.04 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.04 PM.jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.05 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.05 PM (2).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.05 PM.jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.06 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.06 PM (2).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.06 PM.jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.07 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.07 PM (2).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.07 PM.jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.08 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.08 PM (2).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.08 PM.jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.09 PM (1).jpeg",
    "WhatsApp Image 2026-06-25 at 5.01.09 PM.jpeg"
  ];
  const [shuffledImages] = useState(() => shuffleImages(successImages));

  return (
    <section className="success-stories-section reveal-on-scroll" id="stories">
      <div className="stories-container">
        
        {/* Title Header */}
        <div className="stories-header">
          <span className="stories-subtitle">Proven Results</span>
          <h2 className="stories-title">Student Success Stories</h2>
          <div className="stories-header-line"></div>
        </div>

        {/* Marquee Wrapper */}
        <div className="marquee-wrapper">
          
          {/* Single Row: Scrolling Right-to-Left */}
          <div className="marquee-row marquee-left-dir">
            <div className="marquee-track">
              {/* Set 1 */}
              <div className="marquee-group">
                {shuffledImages.map((img, i) => (
                  <div key={`story-1-${i}`} className="story-card">
                    <img 
                      src={`/Success Stories/${img}`} 
                      alt={`Student Success Story ${i+1}`}
                      className="story-image"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              {/* Set 2 (Duplicate for seamless looping) */}
              <div className="marquee-group">
                {shuffledImages.map((img, i) => (
                  <div key={`story-2-${i}`} className="story-card">
                    <img 
                      src={`/Success Stories/${img}`} 
                      alt={`Student Success Story ${i+1}`}
                      className="story-image"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

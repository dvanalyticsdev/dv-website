import React from 'react';

const storyGroups = [
  [
    'WhatsApp Image 2026-07-01 at 11.19.49 AM.jpeg',
    'WhatsApp Image 2026-07-01 at 11.19.50 AM (1).jpeg',
    'WhatsApp Image 2026-07-01 at 11.19.50 AM (2).jpeg',
    'WhatsApp Image 2026-07-01 at 11.19.50 AM.jpeg',
    'WhatsApp Image 2026-07-01 at 11.19.51 AM.jpeg',
  ],
  [
    'WhatsApp Image 2026-06-29 at 11.28.19 AM.jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.20 AM (1).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.20 AM (2).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.20 AM.jpeg',
  ],
  [
    'WhatsApp Image 2026-06-29 at 11.28.08 AM (1).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.08 AM (2).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.08 AM.jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.09 AM (1).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.09 AM.jpeg',
  ],
  [
    'WhatsApp Image 2026-06-29 at 11.28.55 AM.jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.56 AM (1).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.56 AM (2).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.56 AM (3).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.56 AM.jpeg',
  ],
  [
    'WhatsApp Image 2026-06-29 at 11.28.44 AM (1).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.44 AM (2).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.44 AM.jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.45 AM (1).jpeg',
    'WhatsApp Image 2026-06-29 at 11.28.45 AM.jpeg',
  ],
];

const buildAlternatingStories = (): string[] => {
  const completeRounds = Math.min(...storyGroups.map((group) => group.length));
  return Array.from({ length: completeRounds }, (_, index) =>
    storyGroups.map((group) => group[index]),
  ).flat();
};

export const SuccessStories: React.FC = () => {
  const stories = buildAlternatingStories();

  const renderStories = (set: number) => stories.map((image, index) => (
    <div key={`story-${set}-${image}`} className="story-card">
      <img
        src={`/Success Stories/${image}`}
        alt={`Student Success Story ${index + 1}`}
        className="story-image"
        loading={set === 1 && index < 5 ? 'eager' : 'lazy'}
      />
    </div>
  ));

  return (
    <section className="success-stories-section reveal-on-scroll" id="stories">
      <div className="stories-container">
        <div className="stories-header">
          <span className="stories-subtitle">Proven Results</span>
          <h2 className="stories-title">Student Success Stories</h2>
          <div className="stories-header-line"></div>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-row marquee-left-dir">
            <div className="marquee-track">
              <div className="marquee-group">{renderStories(1)}</div>
              <div className="marquee-group" aria-hidden="true">{renderStories(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
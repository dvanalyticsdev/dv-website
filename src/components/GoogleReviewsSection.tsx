import React, { useEffect } from 'react';

export const GoogleReviewsSection: React.FC = () => {
  useEffect(() => {
    // Dynamically create and load the Starwall widget script
    const script = document.createElement('script');
    script.src = "https://starwall.io/embed/PY8TAUeHoPn4Eo6z1oziP8wApJvqh4em/widget.js";
    script.async = true;

    // Append script to the reviews widget container
    const container = document.getElementById('reviews-widget-30');
    if (container) {
      container.appendChild(script);
    } else {
      document.body.appendChild(script);
    }

    // Cleanup the script if the component unmounts
    return () => {
      script.remove();
    };
  }, []);

  return (
    <section className="google-reviews-section reveal-on-scroll" id="reviews">
      <div className="container">
        
        {/* Title Header */}
        <div className="section-header text-center" style={{ marginBottom: '3.5rem' }}>
          <span className="section-subtitle">Student Testimonials</span>
          <h2 className="section-title">Verified Google Reviews</h2>
          <div className="section-title-divider"></div>
        </div>

        {/* Starwall Live Widget Target Container */}
        <div style={{ minHeight: '380px', width: '100%' }}>
          <div id="reviews-widget-30"></div>
        </div>

      </div>
    </section>
  );
};

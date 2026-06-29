import React from 'react';

export const CompaniesSection: React.FC = () => {
  const companies = [
    { name: 'HSBC', logo: '/company-logos/HSBC.png', slug: 'hsbc' },
    { name: 'Citi', logo: '/company-logos/citi.png', slug: 'citi' },
    { name: 'Target', logo: '/company-logos/target.png', slug: 'target' },
    { name: 'Walmart', logo: '/company-logos/wallmart.png', slug: 'walmart' },
    { name: 'Amazon', logo: '/company-logos/amazon.png', slug: 'amazon' },
    { name: 'Flipkart', logo: '/company-logos/flipkart.png', slug: 'flipkart' },
    { name: 'Dell', logo: '/company-logos/DELL.png', slug: 'dell' },
    { name: 'HP', logo: '/company-logos/hp.png', slug: 'hp' },
    { name: 'Wells Fargo', logo: '/company-logos/wells fargo.png', slug: 'wells-fargo' },
    { name: 'Bank of America', logo: '/company-logos/bank of america.png', slug: 'bank-of-america' },
    { name: 'Capgemini', logo: '/company-logos/capgemini.png', slug: 'capgemini' },
    { name: 'TCS', logo: '/company-logos/tcs.png', slug: 'tcs' },
    { name: 'Infosys', logo: '/company-logos/infosys.png', slug: 'infosys' },
    { name: 'Accenture', logo: '/company-logos/accenture.png', slug: 'accenture' },
    { name: 'IBM', logo: '/company-logos/ibm.png', slug: 'ibm' },
    { name: 'Microsoft', logo: '/company-logos/microsoft.png', slug: 'microsoft' },
    { name: 'Cognizant', logo: '/company-logos/cognizant.png', slug: 'cognizant' },
    { name: 'Tech Mahindra', logo: '/company-logos/tech mahindra.png', slug: 'tech-mahindra' }
  ];

  return (
    <section className="companies-section reveal-on-scroll">
      <div className="companies-container">
        
        {/* Section Header */}
        <div className="companies-header">
          <span className="companies-subtitle">Career Placements</span>
          <h2 className="companies-title">Companies That Hire You</h2>
          <div className="companies-header-line"></div>
        </div>

        {/* Company Logos Grid (18 Companies) */}
        <div className="companies-grid">
          {companies.map((company) => (
            <div key={company.name} className={`company-card company-card-${company.slug}`}>
              <div className="company-logo-frame">
                <img src={company.logo} alt={`${company.name} logo`} />
              </div>
            </div>
          ))}
        </div>

        {/* AND MORE Footer Text */}
        <div className="companies-footer-text">
          And More...
        </div>

      </div>
    </section>
  );
};

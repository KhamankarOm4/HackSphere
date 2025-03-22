import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>About Medicine Inventory System</h2>
      
      <div className="about-section">
        <div className="mission-section">
          <h3>Our Mission</h3>
          <p>
            To provide an efficient and reliable medicine inventory management system 
            that helps pharmacies and healthcare facilities maintain optimal stock levels 
            and ensure medication safety.
          </p>
        </div>

        <div className="features-section">
          <h3>Key Features</h3>
          <ul>
            <li>Real-time inventory tracking</li>
            <li>Expiry date monitoring</li>
            <li>Low stock alerts</li>
            <li>Category-based organization</li>
            <li>AI-powered chatbot assistance</li>
            <li>Detailed medicine information</li>
          </ul>
        </div>

        <div className="team-section">
          <h3>Our Team</h3>
          <div className="team-members">
            <div className="team-member">
              <img src="https://placekitten.com/100/100" alt="Team Member" />
              <h4>John Doe</h4>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <img src="https://placekitten.com/101/101" alt="Team Member" />
              <h4>Jane Smith</h4>
              <p>UI/UX Designer</p>
            </div>
            <div className="team-member">
              <img src="https://placekitten.com/102/102" alt="Team Member" />
              <h4>Mike Johnson</h4>
              <p>System Architect</p>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>📧 Email: support@medinventory.com</p>
            <p>📞 Phone: (555) 123-4567</p>
            <p>🏢 Address: 123 Healthcare Street, Medical District, City</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 
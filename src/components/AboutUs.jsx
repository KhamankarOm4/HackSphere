import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h2>About Medicine Inventory System</h2>
      
      <div className="about-section">
        <div className="mission-section">
          <h3>Our Mission</h3>
          <p>
          "To provide an intelligent and comprehensive medicine inventory management system that
           streamlines stock management, supplier coordination, and prescription handling—ensuring 
           optimal efficiency, reduced wastage, and enhanced medication safety for pharmacies and 
           healthcare facilities."
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
            <li>Supplier Management</li>
            <li>Demand Forecast</li>
          </ul>
        </div>

        <div className="team-section">
          <h3>Our Team</h3>
          <div className="team-members">
            <div className="team-member">
               
              <h3>Om Khamankar</h3>
            
            </div>
            <div className="team-member">
               
              <h3>Parth Agrawal</h3>
             
            </div>
            <div className="team-member">
           
              <h3>Priyanshu Chakole</h3>
 
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>📧 Email: support@medinventory.com</p>
            <p>📞 Phone: 98230000457</p>
            <p>🏢 Address: RCOEM,Gittikhadan,Katol Road ,Nagpur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
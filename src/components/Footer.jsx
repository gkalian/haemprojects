// Import required dependencies
import React from 'react';
import '../styles/footer.css';
import config from '../resources/config.json';

/**
 * Footer component that displays the team name and current year
 * Positioned at the bottom of the page with styling from footer.css
 * @returns {JSX.Element} Footer component with copyright text
 */
const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <footer className="footer">
      <span>
        {config.teamName}, © {getCurrentYear()}
      </span>
    </footer>
  );
};

export default Footer;

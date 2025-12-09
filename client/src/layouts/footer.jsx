import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-8">
      <div className="container mx-auto px-4">
        <p className="mb-4">&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3 hover:text-blue-400 transition-colors duration-300">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3 hover:text-blue-400 transition-colors duration-300">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3 hover:text-blue-400 transition-colors duration-300">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-3 hover:text-blue-400 transition-colors duration-300">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
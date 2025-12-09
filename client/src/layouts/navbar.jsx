import React, { useState, useEffect } from 'react';
import { RiHome2Line, RiMenuFill, RiCloseLine } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiGearBold } from "react-icons/pi";
import { RiContactsLine } from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-11/18 bg-transparent z-50 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-2 px-6 bg-black/30 backdrop-blur-lg rounded-full border-2 border-white/20">
          {/* Logo */}
          <div className="logo">
            <h2 className="text-white text-lg font-bold">Portfolio</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            <a 
              href="/" 
              onClick={closeMenu}
              className="text-white text-sm hover:text-blue-500 font-medium transition-colors duration-300 flex items-center"
            >
              <RiHome2Line className="mr-2" /> Home
            </a>
            <a 
              href="/about" 
              onClick={closeMenu}
              className="text-white text-sm hover:text-blue-500 font-medium transition-colors duration-300 flex items-center"
            >
              <IoMdInformationCircleOutline className="mr-2" /> About
            </a>
            <a 
              href="/projects" 
              onClick={closeMenu}
              className="text-white text-sm hover:text-blue-500 font-medium transition-colors duration-300 flex items-center"
            >
              <PiGearBold className="mr-2" /> Projects
            </a>
            <a 
              href="/contact" 
              onClick={closeMenu}
              className="text-white text-sm hover:text-blue-500 font-medium transition-colors duration-300 flex items-center"
            >
              <RiContactsLine className="mr-2" /> Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <RiCloseLine className="text-2xl" />
              ) : (
                <RiMenuFill className="text-2xl" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 bg-black/30 backdrop-blur-lg rounded-2xl p-4">
            <div className="flex flex-col space-y-3 pt-2">
              <a 
                href="/" 
                onClick={closeMenu}
                className="text-white text-lg hover:text-blue-500 font-medium transition-colors duration-300 flex items-center py-2"
              >
                <RiHome2Line className="mr-2" /> Home
              </a>
              <a 
                href="/about" 
                onClick={closeMenu}
                className="text-white text-lg hover:text-blue-500 font-medium transition-colors duration-300 flex items-center py-2"
              >
                <IoMdInformationCircleOutline className="mr-2" /> About
              </a>
              <a 
                href="/projects" 
                onClick={closeMenu}
                className="text-white text-lg hover:text-blue-500 font-medium transition-colors duration-300 flex items-center py-2"
              >
                <PiGearBold className="mr-2" /> Projects
              </a>
              <a 
                href="/contact" 
                onClick={closeMenu}
                className="text-white text-lg hover:text-blue-500 font-medium transition-colors duration-300 flex items-center py-2"
              >
                <RiContactsLine className="mr-2" /> Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
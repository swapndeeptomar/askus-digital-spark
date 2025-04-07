
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-askus-black/95 backdrop-blur-sm z-50 shadow-sm border-b border-askus-red/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-askus-red text-white flex items-center justify-center font-bold">A</div>
              <span className="text-xl font-bold text-white">AskUS</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-300 hover:text-askus-red font-medium">Home</Link>
            <Link to="/services" className="text-gray-300 hover:text-askus-red font-medium">Services</Link>
            <Link to="/portfolio" className="text-gray-300 hover:text-askus-red font-medium">Portfolio</Link>
            <Link to="/about" className="text-gray-300 hover:text-askus-red font-medium">About Us</Link>
            <Link to="/contact" className="text-gray-300 hover:text-askus-red font-medium">Contact</Link>
          </nav>

          <div className="hidden md:block">
            <Button className="bg-askus-red hover:bg-askus-red/90 text-white">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-askus-red focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-askus-black border-t border-askus-red/20">
          <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-gray-300 hover:bg-askus-red/10 hover:text-askus-red"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="block px-3 py-2 rounded-md text-gray-300 hover:bg-askus-red/10 hover:text-askus-red"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/portfolio" 
              className="block px-3 py-2 rounded-md text-gray-300 hover:bg-askus-red/10 hover:text-askus-red"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-gray-300 hover:bg-askus-red/10 hover:text-askus-red"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-gray-300 hover:bg-askus-red/10 hover:text-askus-red"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <Button className="w-full bg-askus-red hover:bg-askus-red/90 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

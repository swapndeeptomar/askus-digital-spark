
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-askus-purple text-white flex items-center justify-center font-bold">D</div>
              <span className="text-xl font-bold text-askus-dark">DigiSphere</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-askus-purple font-medium">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-askus-purple font-medium">Services</Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-askus-purple font-medium">Portfolio</Link>
            <Link to="/about" className="text-gray-700 hover:text-askus-purple font-medium">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-askus-purple font-medium">Contact</Link>
            <Link to="/login" className="text-gray-700 hover:text-askus-purple font-medium">Login</Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/contact">
              <Button className="bg-askus-purple hover:bg-askus-purple/90">
                Get Started
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-askus-purple text-askus-purple hover:bg-askus-purple/10">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-askus-purple focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-askus-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-askus-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/portfolio" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-askus-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-askus-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-askus-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/login"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-askus-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <div className="pt-2 flex gap-2">
              <Link to="/contact" className="w-1/2">
                <Button className="w-full bg-askus-purple hover:bg-askus-purple/90">
                  Get Started
                </Button>
              </Link>
              <Link to="/contact" className="w-1/2">
                <Button variant="outline" className="w-full border-askus-purple text-askus-purple hover:bg-askus-purple/10">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;


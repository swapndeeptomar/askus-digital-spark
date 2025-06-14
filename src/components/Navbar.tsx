import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handles dropdown navigation and closes mobile menu if open
  const handleDropdownClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-askus-purple hover:bg-askus-purple/90 flex items-center gap-1">
                  Get Started
                  <ChevronDown size={18} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[105] bg-white min-w-[160px] shadow-lg border border-gray-100">
                <DropdownMenuItem asChild>
                  <Link to="/get-quote">Get Quote</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact">Contact Us</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full bg-askus-purple hover:bg-askus-purple/90 flex items-center gap-1 justify-center">
                    Get Started
                    <ChevronDown size={18} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[105] bg-white min-w-[160px] shadow-lg border border-gray-100">
                  <DropdownMenuItem
                    onSelect={() => handleDropdownClick('/get-quote')}
                  >
                    Get Quote
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleDropdownClick('/contact')}
                  >
                    Contact Us
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

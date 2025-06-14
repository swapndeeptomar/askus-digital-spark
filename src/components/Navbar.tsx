
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import UserMenu from './UserMenu';
import AdminLoginModal from './AdminLoginModal';
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string | null } | null>(null);
  const navigate = useNavigate();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Handles dropdown navigation and closes mobile menu if open
  const handleDropdownClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Auth state: track current user
  useEffect(() => {
    let isMounted = true;
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setUser(session?.user ? { email: session.user.email } : null);
    });

    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) setUser(session?.user ? { email: session.user.email } : null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <AdminLoginModal open={showAdminLogin} onOpenChange={setShowAdminLogin} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Logo triggers admin login modal */}
            <button
              type="button"
              aria-label="Admin login"
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setShowAdminLogin(true)}
              style={{ background: "transparent", border: "none", padding: 0, margin: 0 }}
            >
              <img
                src="/lovable-uploads/95baa89b-0559-42b7-9b49-4fc9241e6ce5.png"
                alt="DigiSphere Logo"
                className="w-10 h-10 rounded-full object-cover bg-white border-2 border-askus-purple shadow-sm"
                style={{ background: '#fff' }}
              />
            </button>
            {/* "DigiSphere" text links to home page */}
            <Link to="/" className="ml-2 text-xl font-bold text-askus-dark hover:text-askus-purple transition-colors">
              DigiSphere
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-askus-purple font-medium">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-askus-purple font-medium">Services</Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-askus-purple font-medium">Portfolio</Link>
            <Link to="/about" className="text-gray-700 hover:text-askus-purple font-medium">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-askus-purple font-medium">Contact</Link>
            {/* Show either login link or user menu */}
            {user
              ? <div className="flex items-center"><UserMenu user={user} /></div>
              : (
                <Link to="/login" className="text-gray-700 hover:text-askus-purple font-medium">Login</Link>
              )
            }
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-askus-purple hover:bg-askus-purple/90 flex items-center gap-1">
                  Get Started
                  <ChevronDown size={18} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[105] bg-white min-w-[180px] shadow-lg border border-gray-100">
                <DropdownMenuItem asChild>
                  <Link to="/get-quote">Get Quote</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/contact">Contact Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/payment">Make a Payment</Link>
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
            {/* Show login or user in mobile menu */}
            {user
              ? <div className="block px-3 py-2 rounded-md text-gray-700"><UserMenu user={user} /></div>
              : (
                <Link 
                  to="/login"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-askus-purple"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )
            }
            <div className="pt-2 flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full bg-askus-purple hover:bg-askus-purple/90 flex items-center gap-1 justify-center">
                    Get Started
                    <ChevronDown size={18} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[105] bg-white min-w-[180px] shadow-lg border border-gray-100">
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
                  <DropdownMenuItem
                    onSelect={() => handleDropdownClick('/payment')}
                  >
                    Make a Payment
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



import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-8xl font-bold text-askus-purple mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-6 text-askus-dark">Page Not Found</h2>
            <p className="text-xl text-gray-600 mb-8">
              Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
              <Button className="bg-askus-purple hover:bg-askus-purple/90 px-6 py-3 text-lg flex items-center gap-2">
                <ArrowLeft size={18} />
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;

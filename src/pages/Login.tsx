
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"; // Using react-icons for Google icon
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Login = () => {
  // Placeholder for Google OAuth logic
  const handleGoogleLogin = () => {
    alert("Google login integration coming soon!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-20">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-askus-purple rounded-full text-white flex items-center justify-center font-extrabold text-2xl">D</div>
              <span className="text-2xl font-bold text-askus-dark">DigiSphere Login</span>
            </div>
            <p className="text-gray-600">Welcome back! Sign in to your account.</p>
          </div>
          <Button 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full bg-white border text-gray-700 hover:bg-gray-50 hover:shadow focus:ring-2 focus:ring-askus-purple"
            variant="outline"
            size="lg"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </Button>
          <div className="flex justify-center">
            <Link to="/" className="text-askus-purple hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

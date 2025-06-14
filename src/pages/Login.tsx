
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to auth changes and redirect if already logged in
    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      // If user is logged in, redirect to home
      if (session && session.user) {
        navigate("/", { replace: true });
      }
    });

    // Also check current session in case of reload
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        navigate("/", { replace: true });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
    // Only run once on mount
    // eslint-disable-next-line
  }, []);

  const handleGoogleLogin = async () => {
    setLoggingIn(true);
    try {
      const redirectTo = `${window.location.origin}/login`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
        },
      });
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        setLoggingIn(false);
      }
      // No need to navigate here. Supabase OAuth will handle redirect.
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message || "Unknown error. Try again.",
        variant: "destructive",
      });
      setLoggingIn(false);
    }
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
            disabled={loggingIn}
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full bg-white border text-gray-700 hover:bg-gray-50 hover:shadow focus:ring-2 focus:ring-askus-purple"
            variant="outline"
            size="lg"
          >
            <FcGoogle size={24} />
            <span>{loggingIn ? "Redirecting..." : "Sign in with Google"}</span>
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

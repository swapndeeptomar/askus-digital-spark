
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaMicrosoft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const oauthProviders = [
  {
    id: "google",
    label: "Google",
    icon: <FcGoogle size={24} />,
    color: "bg-white border text-gray-700",
  },
  {
    id: "github",
    label: "GitHub",
    icon: <FaGithub size={22} />,
    color: "bg-black border text-white",
  },
  {
    id: "azure",
    label: "Outlook",
    icon: <FaMicrosoft size={22} className="text-blue-500" />,
    color: "bg-white border text-blue-800",
  },
];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loggingIn, setLoggingIn] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to auth changes and redirect if already logged in
    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
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

  const handleOAuthLogin = async (provider: string) => {
    setLoggingIn(provider);
    try {
      // CHANGED: now redirect to "/" (home) after OAuth login, not "/login"
      const redirectTo = `${window.location.origin}/`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
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
        setLoggingIn(null);
      }
      // No need to navigate here. Supabase OAuth will handle redirect.
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message || "Unknown error. Try again.",
        variant: "destructive",
      });
      setLoggingIn(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-askus-purple/10 via-white to-askus-purple/30">
      {/* Decorative background circles for extra pop */}
      <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
        <div className="absolute -top-24 -left-32 w-96 h-96 bg-askus-purple/30 rounded-full blur-2xl opacity-50" />
        <div className="absolute -bottom-40 right-0 w-[500px] h-[400px] bg-askus-purple/20 rounded-full blur-2xl opacity-40" />
        <div className="absolute top-1/4 left-1/2 w-1/2 h-40 bg-gradient-to-tr from-askus-purple/20 to-white/0 blur-3xl opacity-40 -z-10 rotate-12" />
      </div>
      <Navbar />
      <main className="flex flex-1 items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl p-8 space-y-8 mx-auto transition-all">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 bg-askus-purple rounded-full text-white flex items-center justify-center font-extrabold text-2xl">D</div>
              <span className="text-2xl font-bold text-askus-dark">DigiSphere Login</span>
            </div>
            <p className="text-gray-600">Welcome back! Sign in to your account.</p>
          </div>
          <div className="space-y-3">
            {oauthProviders.map((provider) => (
              <Button
                key={provider.id}
                disabled={!!loggingIn}
                onClick={() => handleOAuthLogin(provider.id)}
                className={`flex items-center justify-center gap-3 w-full ${provider.color} hover:bg-gray-50 hover:shadow focus:ring-2 focus:ring-askus-purple`}
                variant="outline"
                size="lg"
              >
                {provider.icon}
                <span>
                  {loggingIn === provider.id
                    ? "Redirecting..."
                    : `Sign in with ${provider.label}`}
                </span>
              </Button>
            ))}
          </div>
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


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Protect this page—must be admin
    const isAdmin = localStorage.getItem("isAdmin") === "1";
    if (!isAdmin) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden bg-gradient-to-br from-askus-purple/70 via-askus-light/90 to-white/95 dark:from-[#201C3E]/90 dark:via-[#15001E]/80 dark:to-[#2b2550]/70">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-6 pt-24">
        <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/60 text-center space-y-6">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-12 h-12 bg-askus-purple rounded-full text-white flex items-center justify-center font-bold text-2xl shadow">A</div>
            <h2 className="text-3xl font-bold text-askus-dark">Admin Panel</h2>
          </div>
          <div>
            <p className="text-gray-700 text-lg">Welcome, <b>Admin</b>!</p>
            <p className="text-gray-600 text-sm mt-2">This is a protected admin area. Add your secure features here.</p>
          </div>
          <Button onClick={handleLogout} className="bg-askus-purple hover:bg-askus-purple/90 w-full">Logout</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

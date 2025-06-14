
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { LogOut, User } from "lucide-react";

type UserMenuProps = {
  user: { email: string | null };
  onSignOut?: () => void;
};

const getInitialFromEmail = (email: string | null): string => {
  if (!email) return "?";
  return email.charAt(0).toUpperCase();
};

const getNameFromEmail = (email: string | null): string => {
  if (!email) return "User";
  const name = email.split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut }) => {
  const handleSignOut = async () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) localStorage.removeItem(key);
    });
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) sessionStorage.removeItem(key);
    });
    try {
      await supabase.auth.signOut({ scope: "global" });
    } catch (err) {/* ignore error */}
    window.location.href = "/login";
    if (onSignOut) onSignOut();
    toast({
      title: "Signed out",
      description: "You've been logged out.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 focus:outline-none rounded-full p-1 hover:shadow-lg transition border-2 border-purple-200 hover:border-askus-purple"
          aria-label="Open user menu"
        >
          <Avatar className="w-9 h-9 ring-2 ring-askus-purple/90 shadow-sm bg-gradient-to-br from-askus-purple via-purple-500 to-indigo-500">
            <AvatarFallback className="bg-gradient-to-tr from-askus-purple via-purple-400 to-purple-600 text-white font-bold text-lg select-none">
              {getInitialFromEmail(user.email)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="z-[105] w-64 min-w-[200px] border-none rounded-xl shadow-2xl mt-2 p-0 overflow-hidden animate-fade-in"
      >
        {/* Gradient accent header */}
        <div className="bg-gradient-to-r from-askus-purple via-purple-500 to-purple-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white border-2 border-white/60 shadow-md bg-gradient-to-br from-white/20 via-askus-purple/40 to-purple-400/40">
              {getInitialFromEmail(user.email)}
            </div>
            <div className="text-white">
              <div className="text-base font-semibold leading-tight">
                {getNameFromEmail(user.email)}
              </div>
              <div className="text-[13px] opacity-90 truncate max-w-[120px]">{user.email || "User"}</div>
            </div>
          </div>
        </div>
        {/* Menu Items */}
        <div className="py-2 bg-white">
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-rose-600 hover:bg-rose-600/10 gap-2 font-medium px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            <LogOut size={18} className="text-rose-500" />
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

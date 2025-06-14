
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
import { LogOut } from "lucide-react";

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
      if (key.startsWith("supabase.auth.") || key.includes("sb-"))
        localStorage.removeItem(key);
    });
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-"))
        sessionStorage.removeItem(key);
    });
    try {
      await supabase.auth.signOut({ scope: "global" });
    } catch (err) {
      /* ignore error */
    }
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
          className="flex items-center focus:outline-none rounded-full p-0.5 border border-transparent hover:border-askus-purple transition"
          aria-label="Open user menu"
        >
          <Avatar className="w-8 h-8 shadow bg-gradient-to-br from-askus-purple via-purple-400 to-purple-600">
            <AvatarFallback className="bg-gradient-to-tr from-askus-purple via-purple-400 to-purple-800 text-white font-semibold text-base select-none">
              {getInitialFromEmail(user.email)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-[105] w-48 min-w-[140px] p-0 border-none shadow-lg rounded-lg animate-fade-in"
      >
        {/* Compact header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-askus-purple via-purple-400 to-purple-700">
          <div className="w-8 h-8 flex items-center justify-center rounded-full font-semibold text-white bg-gradient-to-br from-white/20 via-askus-purple/40 to-purple-400/40 border border-white/40 shadow">
            {getInitialFromEmail(user.email)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-medium leading-tight truncate max-w-[80px]">
              {getNameFromEmail(user.email)}
            </span>
            <span className="text-white/80 text-xs truncate max-w-[80px]">{user.email || "User"}</span>
          </div>
        </div>
        {/* Menu Item */}
        <div className="py-1.5 px-1 bg-white">
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-rose-600 hover:bg-rose-600/10 gap-2 font-medium px-3 py-2 rounded-md transition-colors justify-start"
          >
            <LogOut size={16} className="text-rose-500" />
            Sign Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

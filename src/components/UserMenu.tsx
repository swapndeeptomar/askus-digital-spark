
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

const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut }) => {
  const handleSignOut = async () => {
    // Clean up local/session storage for Supabase auth
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) localStorage.removeItem(key);
    });
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) sessionStorage.removeItem(key);
    });
    try {
      await supabase.auth.signOut({ scope: "global" });
    } catch (err) {
      // ignore error
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
          className="flex items-center gap-2 focus:outline-none rounded-full p-1 hover:bg-gray-100 transition"
          aria-label="Open user menu"
        >
          <Avatar className="w-8 h-8 text-sm">
            <AvatarFallback>
              <User className="w-5 h-5 text-gray-400" />
              {getInitialFromEmail(user.email)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[105] bg-white w-56 min-w-[180px] shadow-lg border border-gray-100 py-2">
        <div className="px-3 py-2 border-b border-gray-50 mb-1">
          <div className="text-xs text-gray-500 mb-1">Signed in as</div>
          <div className="font-medium text-gray-800 break-words">{user.email || "User"}</div>
        </div>
        <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-red-600">
          <LogOut size={18} className="text-red-600" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

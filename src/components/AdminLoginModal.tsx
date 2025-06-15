
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// These should match src/pages/Login.tsx so that logic/styling is identical:
const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "ad@min@123"; // Keep in sync with /login

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AdminLoginModal: React.FC<Props> = ({ open, onOpenChange }) => {
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setProcessing(true);
    // Same logic as in /login
    if (
      adminId.trim().toLowerCase() === ADMIN_ID &&
      adminPassword === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAdmin", "1");
      setAdminId("");
      setAdminPassword("");
      setAdminError(null);
      setProcessing(false);
      onOpenChange(false);
      window.location.href = "/admin";
    } else {
      setAdminError("Invalid admin ID or password.");
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs w-full p-6 rounded-2xl shadow-2xl border border-white/40 bg-white/95 backdrop-blur-lg">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-askus-purple rounded-full text-white flex items-center justify-center font-extrabold text-2xl shadow-md">D</div>
            <span className="text-xl font-bold text-askus-dark">Admin Login</span>
          </div>
          <form onSubmit={handleAdminLogin} className="space-y-3 mt-2">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-askus-purple bg-gray-50 text-sm"
                autoComplete="username"
                disabled={processing}
              />
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-askus-purple bg-gray-50 text-sm"
                autoComplete="current-password"
                disabled={processing}
              />
            </div>
            <Button
              type="submit"
              className="bg-askus-purple w-full hover:bg-askus-purple/90"
              disabled={processing}
              variant="outline"
            >
              Login as Admin
            </Button>
            {adminError && (
              <div className="text-red-600 text-sm text-center">{adminError}</div>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLoginModal;


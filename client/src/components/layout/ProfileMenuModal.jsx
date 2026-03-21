"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import { authService } from "@/services/authService";
import {
  ADMIN_DASHBOARD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes";

const ProfileMenuModal = ({ currentUser, profileImageUrl, onLoggedOut }) => {
  const router = useRouter();
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dashboardHref = currentUser?.role === "admin" ? ADMIN_DASHBOARD_ROUTE : HOME_ROUTE;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuRef.current || menuRef.current.contains(event.target)) {
        return;
      }

      setMenuOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      onLoggedOut?.();
      setMenuOpen(false);
      router.push(LOGIN_ROUTE);
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="relative rounded-full cursor-pointer  p-0.5 shadow-sm transition "
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        aria-label="Open profile menu"
      >
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={`${currentUser?.full_name || "User"} profile image`}
            className="h-10 w-10 rounded-full border-3 border-gray-300  object-cover"
          />
        ) : (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600">
            <User className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </button>

      {menuOpen && (
        <div
          role="dialog"
          aria-label="Profile menu"
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-lg"
        >
          <div className="rounded-lg bg-slate-50 px-3 py-2">
            <p className="text-sm font-semibold text-slate-900">{currentUser?.full_name}</p>
            <p className="mt-0.5 truncate text-xs text-slate-600">{currentUser?.email}</p>
          </div>

          <div className="mt-3 space-y-1">
            <Link
              href={HOME_ROUTE}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              Profile
            </Link>

            <Link
              href={dashboardHref}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex cursor-pointer w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Settings
            </button>
          </div>

          <div className="my-2 border-t border-slate-200" />

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenuModal;

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  LucideShoppingBag,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { authService } from "@/services/authService";
import ProfileMenuModal from "@/components/layout/ProfileMenuModal";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTER_ROUTE,
} from "@/constants/routes";

const navLinks = [
  { href: HOME_ROUTE, label: "Home" },
  { href: `${HOME_ROUTE}#services`, label: "Services" },
  { href: `${HOME_ROUTE}#how-it-works`, label: "How It Works" },
  { href: `${HOME_ROUTE}#why-us`, label: "Why Us" },
  { href: PRODUCT_ROUTE, label: "Products" },
];

const resolveProfileImageUrl = (profileImagePath) => {
  if (!profileImagePath) return null;

  if (/^https?:\/\//i.test(profileImagePath)) {
    return profileImagePath;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) return null;

  try {
    const origin = new URL(apiBase).origin;
    const normalizedPath = profileImagePath.startsWith("/")
      ? profileImagePath
      : `/${profileImagePath}`;
    return `${origin}${normalizedPath}`;
  } catch {
    return null;
  }
};

const AppNavbar = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadCurrentUser = async () => {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    };

    loadCurrentUser();
  }, []);

  const profileImageUrl = useMemo(
    () => resolveProfileImageUrl(currentUser?.profile_image),
    [currentUser?.profile_image],
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href={HOME_ROUTE}
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          eDermaCare
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {currentUser ? (
          <div className="flex items-center gap-3">
            <Link
              href={PRODUCT_ROUTE}
              className=" text-slate-600 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Open products"
            >
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            </Link>

            <ProfileMenuModal
              currentUser={currentUser}
              profileImageUrl={profileImageUrl}
              onLoggedOut={() => setCurrentUser(null)}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href={LOGIN_ROUTE}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              href={REGISTER_ROUTE}
              className="rounded-lg bg-[#2FA4A9] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#25888d]"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      <nav className="border-t border-slate-200 px-6 py-3 md:hidden">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 overflow-x-auto text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.href}`}
              href={link.href}
              className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 transition hover:bg-slate-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default AppNavbar;

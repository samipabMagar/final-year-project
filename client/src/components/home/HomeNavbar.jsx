"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  DOCTORS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTER_ROUTE,
} from "@/constants/routes";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-us", label: "Why Us" },
  { href: DOCTORS_ROUTE, label: "Doctors" },
  { href: PRODUCT_ROUTE, label: "Products" },
];

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Add shadow when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur-md border-b border-slate-200/60"
          : "bg-white/90 border-b border-slate-200/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3">
        <Link href={HOME_ROUTE} className="flex items-center">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#2FA4A9]">e</span>
            <span className="text-slate-800">Derma</span>
            <span className="text-[#2FA4A9]">Care</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 rounded-lg transition-colors duration-200 group hover:text-[#2FA4A9] hover:bg-[#e8f7f8]"
            >
              {link.label}

              <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-[#2FA4A9] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href={LOGIN_ROUTE}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#2FA4A9] hover:text-[#2FA4A9]"
          >
            Sign In
          </Link>
          <Link
            href={REGISTER_ROUTE}
            className="rounded-lg bg-[#2FA4A9] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#25888d] hover:shadow-md active:scale-95"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={`mobile-${link.href}`}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-[#e8f7f8] hover:text-[#2FA4A9] transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href={LOGIN_ROUTE}
              onClick={() => setMobileOpen(false)}
              className="block text-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-[#2FA4A9] hover:text-[#2FA4A9]"
            >
              Sign In
            </Link>
            <Link
              href={REGISTER_ROUTE}
              onClick={() => setMobileOpen(false)}
              className="block text-center rounded-lg bg-[#2FA4A9] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#25888d]"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HomeNavbar;

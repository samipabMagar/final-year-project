import Link from "next/link";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTER_ROUTE,
} from "@/constants/routes";

const HomeNavbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href={HOME_ROUTE} className="text-xl font-bold tracking-tight text-slate-900">
          eDermaCare
        </Link>

        <nav className="hidden items-center md:justify-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#services" className="hover:text-slate-900 transition">Services</a>
          <a href="#how-it-works" className="hover:text-slate-900 transition">How It Works</a>
          <a href="#why-us" className="hover:text-slate-900 transition">Why Us</a>
          <Link href={PRODUCT_ROUTE} className="hover:text-slate-900 transition">Products</Link>
        </nav>

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
      </div>
    </header>
  );
};

export default HomeNavbar;

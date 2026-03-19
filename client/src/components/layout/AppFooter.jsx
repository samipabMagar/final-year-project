import Link from "next/link";
import { HOME_ROUTE, PRODUCT_ROUTE } from "@/constants/routes";

const AppFooter = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-b from-slate-800/35 to-transparent" />
        <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#2FA4A9]/8 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-slate-700/25 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="inline-flex items-center rounded-full border border-[#E7C873]/35 bg-[#F5E6B3]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#F5E6B3]">
              Skin First Care
            </p>
            <p className="mt-4 text-2xl font-bold tracking-tight text-white">eDermaCare</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Your all-in-one skincare destination for trusted products, expert dermatology support, and personalized care that helps you feel confident in your skin every day.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link href={HOME_ROUTE} className="w-fit transition hover:text-slate-200">Home</Link>
              <Link href={PRODUCT_ROUTE} className="w-fit transition hover:text-slate-200">Products</Link>
              <Link href={`${HOME_ROUTE}#services`} className="w-fit transition hover:text-slate-200">Services</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Support</p>
            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p>Email: support@edermacare.com</p>
              <p>Phone: +977-9800000000</p>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#2FA4A9]/70" />
              Online consultation available 24/7
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700/70 pt-5 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} eDermaCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

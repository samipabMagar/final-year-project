import Link from "next/link";
import { CalendarClock, ShoppingBag, Stethoscope } from "lucide-react";
import { LOGIN_ROUTE, REGISTER_ROUTE } from "@/constants/routes";

const HomeHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#E6F7F7] via-white to-[#F2FBFB]">
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#2FA4A9]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#2FA4A9]/10 px-3 py-1 text-xs font-semibold text-[#1D7D82]">
            Trusted Dermatology Care
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Skincare support that feels personal, modern, and reliable.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Connect with verified dermatologists, discover quality products, and follow treatment plans in one simple platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={REGISTER_ROUTE}
              className="rounded-lg bg-[#2FA4A9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25888d]"
            >
              Create Free Account
            </Link>
            <Link
              href={LOGIN_ROUTE}
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2">
            <div className="mb-3 inline-flex rounded-lg bg-[#2FA4A9]/10 p-2 text-[#2FA4A9]">
              <Stethoscope className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Expert Dermatologists</h3>
            <p className="mt-2 text-sm text-slate-600">Access experienced doctors with a guided consultation flow.</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-[#2FA4A9]/10 p-2 text-[#2FA4A9]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Product Store</h3>
            <p className="mt-1 text-sm text-slate-600">Shop curated skincare essentials.</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 inline-flex rounded-lg bg-[#2FA4A9]/10 p-2 text-[#2FA4A9]">
              <CalendarClock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">Smart Booking</h3>
            <p className="mt-1 text-sm text-slate-600">Book appointments in a few clicks.</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;

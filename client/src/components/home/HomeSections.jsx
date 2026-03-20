import Link from "next/link";
import {
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  LineChart,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  UserRound,
  Video,
} from "lucide-react";
import { services, steps, trustPoints } from "@/constants/homeContent";
import { REGISTER_ROUTE } from "@/constants/routes";

const ICON_MAP = {
  Video,
  ClipboardList,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
};

const STEP_ICONS = [UserRound, CalendarCheck2, LineChart];

const HomeSections = () => {
  return (
    <>
      <section id="services" className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Services Built For Everyday Care</h2>
          <p className="mt-3 text-slate-600">
            Everything you need for better skin in one place, from expert advice to practical treatment plans and trusted products.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#2FA4A9]/30 hover:shadow-md"
            >
              {item.icon && ICON_MAP[item.icon] ? (
                <div className="mb-4 inline-flex rounded-xl bg-[#2FA4A9]/10 p-2.5 text-[#2FA4A9]">
                  {(() => {
                    const Icon = ICON_MAP[item.icon];
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
              ) : null}
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 py-10">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How It Works</h2>
            <p className="mt-3 text-slate-600">
              Start in minutes with a simple 3-step journey designed to keep your skincare progress clear and consistent.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#2FA4A9]/40 hover:shadow-lg"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#2FA4A9] via-[#E7C873] to-[#2FA4A9]" />

                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex rounded-full border border-[#E7C873]/45 bg-[#F5E6B3]/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#8A6B21]">
                    Step {index + 1}
                  </span>
                  {(() => {
                    const StepIcon = STEP_ICONS[index];
                    return StepIcon ? (
                      <div className="rounded-xl bg-[#F5E6B3]/25 p-2 text-[#2FA4A9] ring-1 ring-[#E7C873]/35 transition group-hover:bg-[#F5E6B3]/40 group-hover:ring-[#C9A13A]/40">
                        <StepIcon className="h-5 w-5" />
                      </div>
                    ) : null;
                  })()}
                </div>

                <p className="relative z-10 text-sm leading-6 text-slate-700">{step}</p>

                {index < steps.length - 1 ? (
                  <span className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-[#2FA4A9]/40 md:block" />
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="mx-auto w-full max-w-7xl px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Why People Choose eDermaCare</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {trustPoints.map((item) => {
            const Icon = ICON_MAP[item.icon];

            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {Icon ? <Icon className="h-6 w-6 text-[#2FA4A9]" /> : null}
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-[#2FA4A9] p-8 text-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold">Ready to start your skincare journey?</h3>
              <p className="mt-2 text-sm text-white/90">
                Create your account today and get personalized skincare guidance, expert support, and product recommendations designed to help you see real progress.
              </p>
            </div>
            <Link
              href={REGISTER_ROUTE}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#1D7D82] transition hover:bg-slate-100"
            >
              <CheckCircle2 className="h-4 w-4" />
              Join eDermaCare
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSections;

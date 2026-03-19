import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { services, steps, trustPoints } from "@/constants/homeContent";
import { REGISTER_ROUTE } from "@/constants/routes";

const ICON_MAP = {
  ShieldCheck,
  Truck,
  Sparkles,
};

const HomeSections = () => {
  return (
    <>
      <section id="services" className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Services Built For Everyday Care</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-slate-50 py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How It Works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2FA4A9] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-3 text-sm leading-6 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="mx-auto w-full max-w-6xl px-6 py-16">
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
              <p className="mt-2 text-sm text-white/90">Create your account and begin with expert guidance today.</p>
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

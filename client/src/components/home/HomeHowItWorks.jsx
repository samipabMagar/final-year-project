import { UserRound, CalendarCheck2, LineChart } from "lucide-react";

const STEPS = [
  {
    icon: UserRound,
    number: "01",
    title: "Create Your Profile",
    description:
      "Sign up and complete your skin profile in under 2 minutes. Tell us about your skin type, concerns, and goals.",
  },
  {
    icon: CalendarCheck2,
    number: "02",
    title: "Book a Consultation",
    description:
      "Browse verified dermatologists, pick a time slot that works for you, and confirm your booking instantly.",
  },
  {
    icon: LineChart,
    number: "03",
    title: "Follow Your Plan",
    description:
      "Receive a personalized treatment plan and product recommendations. Track your progress as your skin improves.",
  },
];

const HomeHowItWorks = () => (
  <section
    id="how-it-works"
    className="bg-gradient-to-b from-slate-50 to-white py-16"
  >
    <div className="mx-auto w-full max-w-7xl px-6">
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-[#2FA4A9]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1D7D82]">
          Simple Process
        </span>
        <h2 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
          Start your skincare journey in just 3 simple steps — designed to be
          fast, clear, and beginner-friendly.
        </p>
      </div>

      <div className="relative grid gap-6 md:grid-cols-3">
        <div className="pointer-events-none absolute left-0 right-0 top-10 hidden md:block">
          <div className="mx-auto h-0.5 w-2/3 bg-gradient-to-r from-transparent via-[#2FA4A9]/30 to-transparent" />
        </div>

        {STEPS.map((step, index) => (
          <article
            key={step.number}
            className="relative flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#2FA4A9]/40 hover:shadow-lg"
          >
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#2FA4A9] via-[#E7C873] to-[#2FA4A9]" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2FA4A9] to-[#1D7D82] shadow-lg shadow-teal-500/30">
              <step.icon className="h-7 w-7 text-white" />

              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5E6B3] text-[10px] font-extrabold text-[#8A6B21] shadow-sm">
                {index + 1}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
            <p className="text-sm leading-6 text-slate-500">
              {step.description}
            </p>

            {index < STEPS.length - 1 && (
              <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex h-8 w-8 items-center justify-center rounded-full border border-[#2FA4A9]/30 bg-white shadow-sm">
                <span className="text-sm text-[#2FA4A9]">›</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default HomeHowItWorks;

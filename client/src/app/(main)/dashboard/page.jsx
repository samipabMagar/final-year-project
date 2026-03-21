import Link from "next/link";
import { CalendarDays, ClipboardList, MessageSquare, Package } from "lucide-react";
import { PRODUCT_ROUTE } from "@/constants/routes";

const userStats = [
  {
    title: "Appointments",
    value: "03",
    hint: "1 upcoming this week",
    icon: CalendarDays,
  },
  {
    title: "Orders",
    value: "07",
    hint: "2 in delivery",
    icon: Package,
  },
  {
    title: "Treatments",
    value: "04",
    hint: "2 active plans",
    icon: ClipboardList,
  },
  {
    title: "Messages",
    value: "12",
    hint: "3 unread",
    icon: MessageSquare,
  },
];

export default function UserDashboardPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">User Dashboard</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">
            This is a static preview. Later we can connect all cards with live data.
          </p>
        </section>

        <section id="orders" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {userStats.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-teal-50 p-2 text-teal-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-medium text-slate-600">{item.title}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
                <p className="mt-1 text-xs text-slate-500">{item.hint}</p>
              </article>
            );
          })}
        </section>

        <section id="appointments" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Upcoming Appointment</h2>
            <p className="mt-2 text-sm text-slate-600">Dr. Sharma • Monday • 10:30 AM</p>
            <p className="mt-1 text-xs text-slate-500">Dermatology consultation</p>
          </article>

          <article id="messages" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={PRODUCT_ROUTE} className="rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700">
                Order Products
              </Link>
              <button type="button" className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Book Appointment
              </button>
            </div>
          </article>
        </section>

        <section id="treatments" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Treatment Snapshot</h2>
          <p className="mt-2 text-sm text-slate-600">Hydration Care Plan • Week 2 of 4</p>
        </section>
      </div>
    </div>
  );
}

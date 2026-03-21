import { CalendarDays, ClipboardList, MessageSquare, Users } from "lucide-react";

const doctorStats = [
  {
    title: "Appointments",
    value: "14",
    hint: "5 today",
    icon: CalendarDays,
  },
  {
    title: "Patients",
    value: "89",
    hint: "8 new this month",
    icon: Users,
  },
  {
    title: "Treatments",
    value: "23",
    hint: "7 active follow-ups",
    icon: ClipboardList,
  },
  {
    title: "Messages",
    value: "19",
    hint: "4 unread",
    icon: MessageSquare,
  },
];

export default function DoctorDashboardPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Doctor Dashboard</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Practice Overview</h1>
          <p className="mt-2 text-sm text-slate-600">
            Static dashboard design for now. We can connect real appointment and treatment data next.
          </p>
        </section>

        <section id="patients" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {doctorStats.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-2 text-blue-700">
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
            <h2 className="text-base font-semibold text-slate-900">Today Schedule</h2>
            <p className="mt-2 text-sm text-slate-600">10:30 AM • Acne follow-up</p>
            <p className="text-sm text-slate-600">01:00 PM • New consultation</p>
            <p className="text-sm text-slate-600">04:15 PM • Treatment review</p>
          </article>

          <article id="messages" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Quick Notes</h2>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li>Review 3 pending treatment plans</li>
              <li>Respond to patient messages</li>
              <li>Update weekly availability slots</li>
            </ul>
          </article>
        </section>

        <section id="treatments" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Treatment Queue</h2>
          <p className="mt-2 text-sm text-slate-600">7 ongoing treatment plans need review today.</p>
        </section>
      </div>
    </div>
  );
}

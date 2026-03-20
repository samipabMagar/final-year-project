"use client";

import Link from "next/link";
import { ShoppingBag, ClipboardCheck, Stethoscope } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const AdminDashboardPage = () => {
  const stats = [
    {
      label: "Products",
      value: "Create, edit and remove",
      icon: ShoppingBag,
      href: ROUTES.ADMIN_PRODUCTS,
    },
    {
      label: "Pending Doctors",
      value: "Approve or reject requests",
      icon: ClipboardCheck,
      href: ROUTES.ADMIN_PENDING_DOCTORS,
    },
    {
      label: "All Doctors",
      value: "Browse approved profiles",
      icon: Stethoscope,
      href: ROUTES.ADMIN_ALL_DOCTORS,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:p-8">
        <span className="inline-flex items-center rounded-full bg-[#2FA4A9]/10 px-3 py-1 text-xs font-semibold text-[#1D7D82]">
          Admin Dashboard
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Keep platform operations simple and fast
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Review doctor registrations, manage products, and monitor core admin actions from one clean workspace.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.href} href={stat.href} className="group">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 inline-flex rounded-xl bg-[#2FA4A9]/10 p-3 text-[#2FA4A9]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{stat.label}</h3>
                <p className="mt-1 text-sm text-slate-600">{stat.value}</p>
                <p className="mt-4 text-sm font-medium text-[#1D7D82] group-hover:text-[#16666B]">Open section</p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboardPage;

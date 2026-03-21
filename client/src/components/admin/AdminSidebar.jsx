"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ClipboardCheck, Stethoscope } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Products",
      href: ROUTES.ADMIN_PRODUCTS,
      icon: ShoppingBag,
      match: "startsWith",
    },
    {
      label: "Pending Doctors",
      href: ROUTES.ADMIN_PENDING_DOCTORS,
      icon: ClipboardCheck,
      match: "exact",
    },
    {
      label: "All Doctors",
      href: ROUTES.ADMIN_ALL_DOCTORS,
      icon: Stethoscope,
      match: "exact",
    },
  ];

  return (
    <aside className="z-30 w-full border-b border-[#1D7D82] bg-[#2FA4A9] lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-72 lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <div className="px-6 pb-4 pt-6 lg:pb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/85">
          Administration
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-white">
          eDermaCare
        </h1>
        <p className="mt-2 text-sm text-white/85">Manage doctors and products from one place.</p>
      </div>

      <nav className="mx-2 flex gap-2 rounded-2xl bg-white/10 p-2 shadow-sm overflow-x-auto px-4 pb-4 lg:block lg:space-y-2 lg:overflow-visible lg:px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.match === "startsWith"
              ? pathname === item.href || pathname.startsWith(`${item.href}/`)
              : pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex border-b border-white/30 shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition lg:w-full ${
                isActive
                  ? "bg-white text-[#1D7D82] shadow-sm"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-[#1D7D82]" : "text-white/85 group-hover:text-white"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

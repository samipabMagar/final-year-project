"use client";

import AllDoctorsTable from "@/components/admin/AllDoctorsTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Stethoscope } from "lucide-react";

const AllDoctorsPage = () => {
  return (
    <div className="space-y-4">
      <AdminPageHeader
        badge="Doctors"
        icon={Stethoscope}
        title="All Doctors"
        description="Browse and monitor approved doctor profiles and their availability status."
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <AllDoctorsTable />
      </div>
    </div>
  );
};

export default AllDoctorsPage;

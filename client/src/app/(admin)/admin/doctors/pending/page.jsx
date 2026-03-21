"use client";

import PendingDoctorsTable from "@/components/admin/PendingDoctorsTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { ClipboardCheck } from "lucide-react";

const PendingDoctorsPage = () => {
  return (
    <div className="space-y-4">
      <AdminPageHeader
        badge="Doctor Approvals"
        icon={ClipboardCheck}
        title="Pending Doctor Registrations"
        description="Review registration requests and approve or reject with clear actions."
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <PendingDoctorsTable />
      </div>
    </div>
  );
};

export default PendingDoctorsPage;

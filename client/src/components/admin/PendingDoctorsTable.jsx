"use client";

import { adminService } from "@/services/adminService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Check, X, Loader2 } from "lucide-react";

const PendingDoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoader, setActionLoader] = useState(null);
  const [rejectModal, setRejectModal] = useState({ show: false, doctorId: null, reason: "" });

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPendingDoctors();
      setDoctors(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch pending doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      setActionLoader(doctorId);
      await adminService.approveDoctor(doctorId);
      toast.success("Doctor approved successfully");
      setDoctors(doctors.filter((d) => d.user_id !== doctorId));
    } catch (error) {
      toast.error(error.message || "Failed to approve doctor");
    } finally {
      setActionLoader(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal.doctorId) return;

    try {
      setActionLoader(rejectModal.doctorId);
      await adminService.rejectDoctor(rejectModal.doctorId, rejectModal.reason);
      toast.success("Doctor rejected successfully");
      setDoctors(doctors.filter((d) => d.user_id !== rejectModal.doctorId));
      setRejectModal({ show: false, doctorId: null, reason: "" });
    } catch (error) {
      toast.error(error.message || "Failed to reject doctor");
    } finally {
      setActionLoader(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#2FA4A9]" />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Approval Queue</h3>
            <p className="text-xs text-slate-600">Pending requests: {doctors.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-slate-100/90 backdrop-blur">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Email</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Specialization</th>
              <th className="px-6 py-3 font-semibold text-slate-700">License</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                  No pending doctor registrations
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor.user_id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{doctor.full_name}</td>
                  <td className="px-6 py-4 text-slate-600">{doctor.email || "N/A"}</td>
                  <td className="px-6 py-4 text-slate-700">{doctor.specialization}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                      {doctor.license_number}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(doctor.user_id)}
                        disabled={actionLoader === doctor.user_id}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-50"
                      >
                        {actionLoader === doctor.user_id ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <Check size={16} />
                        )}
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          setRejectModal({
                            show: true,
                            doctorId: doctor.user_id,
                            reason: "",
                          })
                        }
                        disabled={actionLoader === doctor.user_id}
                        className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-rose-600 disabled:opacity-50"
                      >
                        {actionLoader === doctor.user_id ? (
                          <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                          <X size={16} />
                        )}
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Reject Doctor Registration
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              Please provide a reason for rejection (optional)
            </p>
            <textarea
              value={rejectModal.reason}
              onChange={(e) =>
                setRejectModal({ ...rejectModal, reason: e.target.value })
              }
              className="mb-4 w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-800 outline-none focus:border-[#2FA4A9] focus:ring-2 focus:ring-[#2FA4A9]/20"
              placeholder="Enter rejection reason..."
              rows={4}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() =>
                  setRejectModal({ show: false, doctorId: null, reason: "" })
                }
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoader}
                className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600 disabled:opacity-50"
              >
                {actionLoader ? "Processing..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingDoctorsTable;

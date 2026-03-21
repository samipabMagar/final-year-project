"use client";

import { adminService } from "@/services/adminService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Check, X, Loader2 } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";

const PendingDoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoader, setActionLoader] = useState(null);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [rejectModal, setRejectModal] = useState({
    show: false,
    doctorId: null,
    doctorName: "",
  });

  const getDoctorName = (doctor) => doctor?.user?.full_name || doctor?.full_name || "N/A";
  const getDoctorEmail = (doctor) => doctor?.user?.email || doctor?.email || "N/A";
  const getDoctorPhone = (doctor) => doctor?.user?.phone || doctor?.phone || "N/A";
  const getDoctorGender = (doctor) => doctor?.user?.gender || "N/A";
  const getDoctorAddress = (doctor) => {
    const address = doctor?.user?.address;
    if (!address) return "N/A";
    if (typeof address === "string") return address;
    return [address.street, address.city, address.province].filter(Boolean).join(", ") || "N/A";
  };
  const getSubmittedDate = (doctor) => {
    const dateValue = doctor?.user?.created_at || doctor?.created_at;
    if (!dateValue) return "N/A";
    return new Date(dateValue).toLocaleDateString();
  };

  const formatDetailsList = (value, emptyLabel = "Not provided") => {
    if (!value) return [emptyLabel];

    if (Array.isArray(value)) {
      if (value.length === 0) return [emptyLabel];
      return value.map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item !== null) {
          return Object.values(item).filter(Boolean).join(" - ") || emptyLabel;
        }
        return String(item);
      });
    }

    if (typeof value === "string") {
      return [value];
    }

    if (typeof value === "object") {
      return [Object.values(value).filter(Boolean).join(" - ") || emptyLabel];
    }

    return [String(value)];
  };

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
      setDoctors((prev) => prev.filter((d) => d.user_id !== doctorId));
    } catch (error) {
      toast.error(error.message || "Failed to approve doctor");
    } finally {
      setActionLoader(null);
    }
  };

  const openRejectModal = (doctor) => {
    setRejectModal({
      show: true,
      doctorId: doctor.user_id,
      doctorName: getDoctorName(doctor),
    });
  };

  const closeRejectModal = () => {
    setRejectModal({ show: false, doctorId: null, doctorName: "" });
  };

  const handleReject = async () => {
    if (!rejectModal.doctorId) return;

    try {
      setActionLoader(rejectModal.doctorId);
      await adminService.rejectDoctor(rejectModal.doctorId, "");
      toast.success("Doctor rejected successfully");
      setDoctors((prev) => prev.filter((d) => d.user_id !== rejectModal.doctorId));
      closeRejectModal();
    } catch (error) {
      toast.error(error.message || "Failed to reject doctor");
    } finally {
      setActionLoader(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 sm:p-4">
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
                  <td className="px-6 py-4 font-medium text-slate-900">{getDoctorName(doctor)}</td>
                  <td className="px-6 py-4 text-slate-600">{getDoctorEmail(doctor)}</td>
                  <td className="px-6 py-4 text-slate-700">{doctor.specialization}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                      {doctor.license_number}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => setViewDoctor(doctor)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        View
                      </button>
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
                        onClick={() => openRejectModal(doctor)}
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

      <ConfirmModal
        isOpen={rejectModal.show}
        title="Reject Doctor"
        message={`Are you sure you want to reject ${rejectModal.doctorName || "this doctor"}?`}
        confirmText="Reject"
        cancelText="Cancel"
        isLoading={Boolean(actionLoader)}
        onConfirm={handleReject}
        onCancel={closeRejectModal}
      />

      {viewDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-xl rounded-xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-slate-900">Doctor Details</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
              <p><span className="font-medium text-slate-800">Name:</span> {getDoctorName(viewDoctor)}</p>
              <p><span className="font-medium text-slate-800">Email:</span> {getDoctorEmail(viewDoctor)}</p>
              <p><span className="font-medium text-slate-800">Phone:</span> {getDoctorPhone(viewDoctor)}</p>
              <p><span className="font-medium text-slate-800">Gender:</span> {getDoctorGender(viewDoctor)}</p>
              <p><span className="font-medium text-slate-800">Address:</span> {getDoctorAddress(viewDoctor)}</p>
              <p><span className="font-medium text-slate-800">Specialization:</span> {viewDoctor.specialization || "N/A"}</p>
              <p><span className="font-medium text-slate-800">License:</span> {viewDoctor.license_number || "N/A"}</p>
              <p><span className="font-medium text-slate-800">Experience:</span> {viewDoctor.years_of_experience ?? "N/A"} years</p>
              <p><span className="font-medium text-slate-800">Consultation Fee:</span> Rs {Number(viewDoctor.consultation_fee || 0).toFixed(2)}</p>
              <p><span className="font-medium text-slate-800">Submitted:</span> {getSubmittedDate(viewDoctor)}</p>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-sm font-medium text-slate-800">Bio</p>
              <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {viewDoctor.bio || "No bio provided"}
              </p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-sm font-medium text-slate-800">Education</p>
                <ul className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 space-y-1">
                  {formatDetailsList(viewDoctor.education, "No education provided").map((item, index) => (
                    <li key={`education-${index}`}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-slate-800">Certifications</p>
                <ul className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 space-y-1">
                  {formatDetailsList(viewDoctor.certifications, "No certifications provided").map((item, index) => (
                    <li key={`certification-${index}`}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setViewDoctor(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingDoctorsTable;

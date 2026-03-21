"use client";

import { adminService } from "@/services/adminService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader2, Search } from "lucide-react";

const AllDoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("");

  const getDoctorName = (doctor) => doctor?.user?.full_name || doctor?.full_name || "N/A";
  const getDoctorEmail = (doctor) => doctor?.user?.email || doctor?.email || "N/A";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async (name = "", available = "") => {
    try {
      setLoading(true);
      const filters = {};
      if (available) filters.is_available = available === "true";

      const data = await adminService.getAllDoctors(filters);

      // Filter by search term
      let filtered = data;
      if (name) {
        filtered = data.filter(
          (doctor) =>
            getDoctorName(doctor).toLowerCase().includes(name.toLowerCase()) ||
            doctor.specialization?.toLowerCase().includes(name.toLowerCase())
        );
      }

      setDoctors(filtered);
    } catch (error) {
      toast.error(error.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    fetchDoctors(value, filterAvailable);
  };

  const handleFilterChange = (value) => {
    setFilterAvailable(value);
    fetchDoctors(search, value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-(--brand-primary)" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Doctor Directory</h3>
          <p className="text-xs text-slate-600">Total records: {doctors.length}</p>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary-soft)"
            />
          </div>
        </div>
        <select
          value={filterAvailable}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 outline-none focus:border-(--brand-primary) focus:ring-2 focus:ring-(--brand-primary-soft)"
        >
          <option value="">All Availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-slate-100/90 backdrop-blur">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Email</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Specialization</th>
              <th className="px-6 py-3 font-semibold text-slate-700">License #</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Availability</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Rating</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                  No doctors found
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor.user_id} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{getDoctorName(doctor)}</td>
                  <td className="px-6 py-4 text-slate-600">{getDoctorEmail(doctor)}</td>
                  <td className="px-6 py-4 text-slate-700">{doctor.specialization}</td>
                  <td className="px-6 py-4 text-xs">
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
                      {doctor.license_number}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        doctor.is_available
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {doctor.is_available ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-500">★</span>
                      {doctor.average_rating ? doctor.average_rating.toFixed(1) : "N/A"}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDoctorsTable;

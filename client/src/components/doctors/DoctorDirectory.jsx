"use client";

import { useEffect, useMemo, useState } from "react";
import { doctorService } from "@/services/doctorService";
import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorDirectoryHeader from "@/components/doctors/DoctorDirectoryHeader";

const DoctorDirectory = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        setError("");

        const doctorList = await doctorService.getDoctors();
        setDoctors(doctorList);
      } catch (loadError) {
        setError(loadError.message || "Unable to load doctors right now.");
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const availableCount = useMemo(() => {
    return doctors.filter((doctor) => doctor.is_available).length;
  }, [doctors]);

  const averageRating = useMemo(() => {
    if (!doctors.length) {
      return "0.0";
    }

    const totalRating = doctors.reduce(
      (sum, doctor) => sum + Number(doctor.rating || 0),
      0,
    );

    return (totalRating / doctors.length).toFixed(1);
  }, [doctors]);

  return (
    <section className="bg-slate-50 px-4 pb-8 pt-3 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <DoctorDirectoryHeader
          totalDoctors={doctors.length}
          availableCount={availableCount}
          averageRating={averageRating}
        />

        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        {!loading && !error && !doctors.length ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center">
            <p className="text-base font-semibold text-slate-900">No doctors available right now</p>
            <p className="mt-2 text-sm text-slate-600">Please check back later for updated doctor availability.</p>
          </div>
        ) : null}

        {!loading && !error && doctors.length ? (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.profile_id} doctor={doctor} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default DoctorDirectory;

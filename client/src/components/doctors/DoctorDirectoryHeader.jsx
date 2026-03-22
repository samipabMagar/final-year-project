const DoctorDirectoryHeader = ({ totalDoctors, availableCount, averageRating }) => {
  return (
    <div className="rounded-2xl border border-teal-100 bg-linear-to-br from-teal-50 via-cyan-50 to-white p-4 shadow-sm sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">Expert Care Team</p>
      <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">Find Your Dermatology Specialist</h1>
      <p className="mt-1.5 max-w-3xl text-sm text-slate-600">
        Browse approved doctors and choose the specialist who matches your skin care needs.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <div className="rounded-xl border border-teal-100 bg-white/85 p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Total Doctors</p>
          <p className="mt-0.5 text-xl font-semibold text-slate-900">{totalDoctors}</p>
        </div>

        <div className="rounded-xl border border-teal-100 bg-white/85 p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Available Now</p>
          <p className="mt-0.5 text-xl font-semibold text-emerald-700">{availableCount}</p>
        </div>

        <div className="rounded-xl border border-teal-100 bg-white/85 p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Average Rating</p>
          <p className="mt-0.5 text-xl font-semibold text-teal-700">{averageRating}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDirectoryHeader;

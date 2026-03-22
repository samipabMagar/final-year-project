import { BriefcaseBusiness, Mail, Phone, Star, Stethoscope } from "lucide-react";

const resolveProfileImageUrl = (profileImagePath) => {
  if (!profileImagePath) return null;

  if (/^https?:\/\//i.test(profileImagePath)) {
    return profileImagePath;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  try {
    const origin = new URL(apiBase).origin;
    const normalizedPath = profileImagePath.startsWith("/")
      ? profileImagePath
      : `/${profileImagePath}`;
    return `${origin}${normalizedPath}`;
  } catch {
    return null;
  }
};

const getDoctorInitials = (fullName = "Doctor") => {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

const formatConsultationFee = (fee) => {
  const amount = Number(fee);

  if (Number.isNaN(amount)) {
    return "N/A";
  }

  return `Rs. ${amount.toLocaleString()}`;
};

const DoctorCard = ({ doctor }) => {
  const profileImageUrl = resolveProfileImageUrl(doctor.user?.profile_image);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={doctor.user?.full_name || "Doctor"}
              className="h-12 w-12 rounded-lg object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : null}

          {!profileImageUrl ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-xs font-semibold text-teal-700">
              {getDoctorInitials(doctor.user?.full_name)}
            </div>
          ) : null}

          <div>
            <h2 className="text-base font-semibold text-slate-900">Dr. {doctor.user?.full_name}</h2>
            <p className="text-sm text-teal-700">{doctor.specialization || "Specialist"}</p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            doctor.is_available ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          {doctor.is_available ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 rounded-xl bg-slate-50 p-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Experience</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-800">
            <BriefcaseBusiness className="h-4 w-4 text-slate-500" aria-hidden="true" />
            {doctor.years_of_experience ?? 0} years
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Consultation</p>
          <p className="mt-1 text-sm font-medium text-slate-800">{formatConsultationFee(doctor.consultation_fee)}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Rating</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-800">
            <Star className="h-4 w-4 text-amber-500" aria-hidden="true" />
            {Number(doctor.rating || 0).toFixed(1)} ({doctor.total_reviews || 0})
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Status</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-800">
            <Stethoscope className="h-4 w-4 text-teal-700" aria-hidden="true" />
            Approved
          </p>
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-sm text-slate-600">
        {doctor.bio || "Experienced skin specialist focused on evidence-based diagnosis and treatment."}
      </p>

      <div className="mt-3 space-y-1 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {doctor.user?.email || "No email provided"}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {doctor.user?.phone || "No phone provided"}
        </p>
      </div>
    </article>
  );
};

export default DoctorCard;

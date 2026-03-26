import Image from "next/image";
import { User } from "lucide-react";

const ProfileHeader = ({ user }) => {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:8000";

  const avatarSrc = user.profile_image
    ? `${apiBase}/${user.profile_image}`
    : null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-4">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-teal-100 bg-teal-50 shadow">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={`${user.full_name} profile photo`}
              fill
              className="object-cover"
            />
          ) : (
            <User className="h-12 w-12 text-teal-400" aria-hidden="true" />
          )}
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-slate-900">
            {user.full_name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>

          <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
            <span className="rounded-full bg-teal-100 px-3 py-0.5 text-xs font-semibold capitalize text-teal-700">
              {user.role}
            </span>

            {user.skin_type && (
              <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold capitalize text-amber-700">
                {user.skin_type} skin
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;

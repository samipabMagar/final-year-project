"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/userService";

const SKIN_TYPES = ["normal", "oily", "dry", "combination", "sensitive"];
const GENDERS = ["male", "female", "other"];

const EditProfileForm = ({ user }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: user.full_name || "",
    phone: user.phone || "",
    gender: user.gender || "",
    skin_type: user.skin_type || "",
    city: user.address?.city || "",
    province: user.address?.province || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const payload = {
        full_name: formData.full_name,
        phone: formData.phone,
        gender: formData.gender,
        skin_type: formData.skin_type || null,
        address:
          formData.city && formData.province
            ? { city: formData.city, province: formData.province }
            : null,
      };

      await userService.updateProfile(payload);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      router.refresh();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">
        Personal Information
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Update your name, contact details, and skin type.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-slate-700"
          >
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-slate-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">Select gender</option>
              {GENDERS.map((g) => (
                <option key={g} value={g} className="capitalize">
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="skin_type"
              className="block text-sm font-medium text-slate-700"
            >
              Skin Type
            </label>
            <select
              id="skin_type"
              name="skin_type"
              value={formData.skin_type}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">Select skin type</option>
              {SKIN_TYPES.map((s) => (
                <option key={s} value={s} className="capitalize">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-slate-700"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-slate-700"
            >
              Province
            </label>
            <input
              id="province"
              name="province"
              type="text"
              value={formData.province}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        {message && (
          <p
            role="alert"
            className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
              message.type === "success"
                ? "bg-teal-50 text-teal-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
};

export default EditProfileForm;

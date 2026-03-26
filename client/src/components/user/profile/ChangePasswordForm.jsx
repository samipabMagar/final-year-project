"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { userService } from "@/services/userService";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (formData.new_password !== formData.confirm_new_password) {
      setMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });
      return;
    }

    setIsLoading(true);
    try {
      await userService.changePassword(formData);
      setMessage({ type: "success", text: "Password changed successfully!" });

      setFormData({
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
      <p className="mt-1 text-sm text-slate-500">
        Use a strong password with uppercase, lowercase letters and a number.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        <div>
          <label
            htmlFor="current_password"
            className="block text-sm font-medium text-slate-700"
          >
            Current Password
          </label>
          <input
            id="current_password"
            name="current_password"
            type={showPasswords ? "text" : "password"}
            value={formData.current_password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="new_password"
            className="block text-sm font-medium text-slate-700"
          >
            New Password
          </label>
          <input
            id="new_password"
            name="new_password"
            type={showPasswords ? "text" : "password"}
            value={formData.new_password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="confirm_new_password"
            className="block text-sm font-medium text-slate-700"
          >
            Confirm New Password
          </label>
          <input
            id="confirm_new_password"
            name="confirm_new_password"
            type={showPasswords ? "text" : "password"}
            value={formData.confirm_new_password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <button
          type="button"
          onClick={() => setShowPasswords((prev) => !prev)}
          className="inline-flex mr-4 items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600"
        >
          {showPasswords ? (
            <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {showPasswords ? "Hide passwords" : "Show passwords"}
        </button>

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
          className="rounded-xl bg-slate-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </section>
  );
};

export default ChangePasswordForm;

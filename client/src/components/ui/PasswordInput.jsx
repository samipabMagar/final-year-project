import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PasswordInput = React.forwardRef(
  (
    {
      label = "Password",
      error,
      className = "",
      labelClassName = "",
      containerClassName = "",
      required,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputClass =
      "w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FA4A9] focus:border-[#2FA4A9] outline-none transition bg-white";

    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={props.id}
            className={`text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 ${labelClassName}`}
          >
            <Lock className="w-4 h-4 text-[#2FA4A9]" />
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""} ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2FA4A9]"
          >
            {showPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;

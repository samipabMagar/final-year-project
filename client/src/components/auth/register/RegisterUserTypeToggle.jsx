import { Stethoscope, User } from "lucide-react";

const RegisterUserTypeToggle = ({ userType, onChange }) => {
  return (
    <div className="flex gap-3 mb-6">
      <button
        type="button"
        onClick={() => onChange("patient")}
        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
          userType === "patient"
            ? "bg-[#2FA4A9] text-white shadow-lg scale-105"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <User className="w-4 h-4" />
        Patient
      </button>
      <button
        type="button"
        onClick={() => onChange("doctor")}
        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
          userType === "doctor"
            ? "bg-[#2FA4A9] text-white shadow-lg scale-105"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        <Stethoscope className="w-4 h-4" />
        Doctor
      </button>
    </div>
  );
};

export default RegisterUserTypeToggle;

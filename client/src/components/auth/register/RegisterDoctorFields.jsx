import { BriefcaseBusiness, DollarSign, GraduationCap, Stethoscope } from "lucide-react";
import Input from "@/components/ui/Input";

const RegisterDoctorFields = ({ register, errors }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="specialization"
          type="text"
          label="Specialization"
          icon={Stethoscope}
          required
          {...register("specialization")}
          error={errors.specialization?.message}
          placeholder="e.g., Dermatology"
        />

        <Input
          id="license_number"
          type="text"
          label="License Number"
          icon={GraduationCap}
          required
          {...register("license_number")}
          error={errors.license_number?.message}
          placeholder="e.g., NMC-12345"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="years_of_experience"
          type="number"
          label="Years of Experience"
          icon={BriefcaseBusiness}
          min="0"
          {...register("years_of_experience")}
          error={errors.years_of_experience?.message}
          placeholder="e.g., 5"
        />

        <Input
          id="consultation_fee"
          type="number"
          label="Consultation Fee"
          icon={DollarSign}
          min="0"
          step="0.01"
          {...register("consultation_fee")}
          error={errors.consultation_fee?.message}
          placeholder="e.g., 50"
        />
      </div>
    </>
  );
};

export default RegisterDoctorFields;

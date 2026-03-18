import { BriefcaseBusiness, DollarSign, GraduationCap, Stethoscope } from "lucide-react";
import Input from "@/components/ui/Input";

const RegisterDoctorFields = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="specialization"
          name="specialization"
          type="text"
          label="Specialization"
          icon={Stethoscope}
          required
          value={formData.specialization}
          onChange={onChange}
          placeholder="e.g., Dermatology"
        />

        <Input
          id="license_number"
          name="license_number"
          type="text"
          label="License Number"
          icon={GraduationCap}
          required
          value={formData.license_number}
          onChange={onChange}
          placeholder="e.g., NMC-12345"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="years_of_experience"
          name="years_of_experience"
          type="number"
          label="Years of Experience"
          icon={BriefcaseBusiness}
          min="0"
          value={formData.years_of_experience}
          onChange={onChange}
          placeholder="e.g., 5"
        />

        <Input
          id="consultation_fee"
          name="consultation_fee"
          type="number"
          label="Consultation Fee"
          icon={DollarSign}
          min="0"
          step="0.01"
          value={formData.consultation_fee}
          onChange={onChange}
          placeholder="e.g., 50"
        />
      </div>
    </>
  );
};

export default RegisterDoctorFields;

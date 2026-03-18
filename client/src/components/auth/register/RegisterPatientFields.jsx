import Select from "@/components/ui/Select";

const RegisterPatientFields = ({ register, errors }) => {
  return (
    <Select
      id="skin_type"
      label="Skin Type"
      {...register("skin_type")}
      error={errors.skin_type?.message}
    >
      <option value="">Select Skin Type</option>
      <option value="oily">Oily</option>
      <option value="dry">Dry</option>
      <option value="combination">Combination</option>
      <option value="sensitive">Sensitive</option>
      <option value="normal">Normal</option>
    </Select>
  );
};

export default RegisterPatientFields;

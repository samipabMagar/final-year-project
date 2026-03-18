import Select from "@/components/ui/Select";

const RegisterPatientFields = ({ formData, onChange }) => {
  return (
    <Select
      id="skin_type"
      name="skin_type"
      label="Skin Type"
      value={formData.skin_type}
      onChange={onChange}
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

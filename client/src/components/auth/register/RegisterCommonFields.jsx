import { Mail, Phone, User, UserRound } from "lucide-react";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Select from "@/components/ui/Select";

const RegisterCommonFields = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="full_name"
          name="full_name"
          type="text"
          label="Full Name"
          icon={UserRound}
          required
          value={formData.full_name}
          onChange={onChange}
          placeholder="John Doe"
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          icon={Mail}
          required
          value={formData.email}
          onChange={onChange}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          required
          value={formData.password}
          onChange={onChange}
          placeholder="Min. 8 characters"
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={onChange}
          placeholder="Re-enter password"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Phone Number"
          icon={Phone}
          value={formData.phone}
          onChange={onChange}
          placeholder="(123) 456-7890"
        />

        <Select
          id="gender"
          name="gender"
          label="Gender"
          icon={User}
          value={formData.gender}
          onChange={onChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
      </div>
    </>
  );
};

export default RegisterCommonFields;

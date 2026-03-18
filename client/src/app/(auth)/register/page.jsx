"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterAlerts from "@/components/auth/register/RegisterAlerts";
import RegisterCommonFields from "@/components/auth/register/RegisterCommonFields";
import RegisterDoctorFields from "@/components/auth/register/RegisterDoctorFields";
import RegisterMobileLoginLink from "@/components/auth/register/RegisterMobileLoginLink";
import RegisterPatientFields from "@/components/auth/register/RegisterPatientFields";
import RegisterUserTypeToggle from "@/components/auth/register/RegisterUserTypeToggle";
import { authService } from "@/services/authService";

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

const RegisterPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    skin_type: "",
    specialization: "",
    license_number: "",
    years_of_experience: "",
    consultation_fee: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (!strongPasswordRegex.test(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      );
      setLoading(false);
      return;
    }

    try {
      if (userType === "patient") {
        const patientData = {
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          gender: formData.gender,
          skin_type: formData.skin_type || null,
        };

        await authService.registerPatient(patientData);
        setSuccess("Patient registered successfully! Redirecting to login...");
      } else {
        const doctorData = {
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          gender: formData.gender,
          specialization: formData.specialization,
          license_number: formData.license_number,
          years_of_experience: Number(formData.years_of_experience || 0),
          consultation_fee: Number(formData.consultation_fee || 0),
        };

        await authService.registerDoctor(doctorData);
        setSuccess(
          "Doctor registered successfully! Please wait for admin verification. Redirecting...",
        );
      }

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (submitError) {
      setError(submitError.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Fill in your details to get started"
      sidebarTitle="Start Your Journey"
      sidebarSubtitle="Join thousands of users already using eDermaCare for their skincare needs"
      bottomLink={{
        text: "Already have an account?",
        link: (
          <Link
            href="/login"
            className="text-white font-semibold hover:underline text-lg"
          >
            Sign in here -&gt;
          </Link>
        ),
      }}
    >
      <RegisterUserTypeToggle userType={userType} onChange={setUserType} />
      <RegisterAlerts error={error} success={success} />

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <RegisterCommonFields formData={formData} onChange={handleChange} />

        {userType === "patient" && <RegisterPatientFields formData={formData} onChange={handleChange} />}

        {userType === "doctor" && <RegisterDoctorFields formData={formData} onChange={handleChange} />}

        <Button type="submit" loading={loading} className="w-full text-lg mt-6">
          {`Create ${userType === "patient" ? "Patient" : "Doctor"} Account`}
        </Button>
      </form>

      <RegisterMobileLoginLink />
    </AuthLayout>
  );
};

export default RegisterPage;

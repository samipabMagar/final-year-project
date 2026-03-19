"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { LOGIN_ROUTE } from "@/constants/routes";
import { authService } from "@/services/authService";
import { registerSchema } from "@/validators/authSchemas";

const RegisterPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: "patient",
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
    },
  });

  const userType = watch("userType");

  const handleUserTypeChange = (type) => {
    setValue("userType", type, { shouldValidate: true });
    setServerError("");
  };

  const onSubmit = async (data) => {
    setServerError("");
    setSuccess("");

    try {
      if (data.userType === "patient") {
        const patientData = {
          full_name: data.full_name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          gender: data.gender,
          skin_type: data.skin_type || null,
        };

        await authService.registerPatient(patientData);
        setSuccess("Patient registered successfully! Redirecting to login...");
      } else {
        const doctorData = {
          full_name: data.full_name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          gender: data.gender,
          specialization: data.specialization,
          license_number: data.license_number,
          years_of_experience: data.years_of_experience,
          consultation_fee: data.consultation_fee,
        };

        await authService.registerDoctor(doctorData);
        setSuccess(
          "Doctor registered successfully! Please wait for admin verification. Redirecting...",
        );
      }

      setTimeout(() => {
        router.push(LOGIN_ROUTE);
      }, 2000);
    } catch (submitError) {
      setServerError(submitError.message || "Registration failed. Please try again.");
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
            href={LOGIN_ROUTE}
            className="text-white font-semibold hover:underline text-lg"
          >
            Sign in here -&gt;
          </Link>
        ),
      }}
    >
      <RegisterUserTypeToggle userType={userType} onChange={handleUserTypeChange} />
      <RegisterAlerts error={serverError} success={success} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <RegisterCommonFields register={register} errors={errors} />

        {userType === "patient" && <RegisterPatientFields register={register} errors={errors} />}

        {userType === "doctor" && <RegisterDoctorFields register={register} errors={errors} />}

        <Button type="submit" loading={isSubmitting} className="w-full text-lg mt-6">
          {`Create ${userType === "patient" ? "Patient" : "Doctor"} Account`}
        </Button>
      </form>

      <RegisterMobileLoginLink />
    </AuthLayout>
  );
};

export default RegisterPage;

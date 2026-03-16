"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Mail } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setAuthError("");
      // TODO: Add login API call here
      console.log("Login data:", data);
    } catch (error) {
      setAuthError(error.message || "An error occurred during login");
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Enter your credentials to continue"
      sidebarTitle="Welcome Back!"
      sidebarSubtitle="Sign in to access your personalized skincare dashboard"
    >
      {authError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          id="email"
          type="email"
          label="Email Address"
          icon={Mail}
          required
          {...register("email")}
          error={errors.email?.message}
          placeholder="you@example.com"
        />

        <PasswordInput
          id="password"
          label="Password"
          required
          {...register("password")}
          error={errors.password?.message}
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-[#2FA4A9]" />
            <span className="text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-[#2FA4A9] hover:underline">
            Forgot password?
          </a>
        </div>

        <Button type="submit" loading={isSubmitting} className="w-full text-lg">
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#2FA4A9] hover:underline font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

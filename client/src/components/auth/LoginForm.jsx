import { Mail } from "lucide-react";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";

const LoginForm = ({ register, errors, handleSubmit, onSubmit, isLoading }) => {
  return (
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

      <Button type="submit" loading={isLoading} className="w-full text-lg">
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;

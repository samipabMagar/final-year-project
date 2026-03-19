"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/authSchemas";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginErrorAlert from "@/components/auth/LoginErrorAlert";
import LoginForm from "@/components/auth/LoginForm";
import LoginFooter from "@/components/auth/LoginFooter";
import { HOME_ROUTE } from "@/constants/routes";
import { loginUser } from "@/store/thunks/authThunks";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const resultAction = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(resultAction)) {
      router.push(HOME_ROUTE);
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Enter your credentials to continue"
      sidebarTitle="Welcome Back!"
      sidebarSubtitle="Sign in to access your personalized skincare dashboard"
    >
      <LoginErrorAlert message={error} />
      <LoginForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <LoginFooter />
    </AuthLayout>
  );
};

export default LoginPage;

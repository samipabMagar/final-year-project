import Link from "next/link";

const LoginFooter = () => {
  return (
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
  );
};

export default LoginFooter;

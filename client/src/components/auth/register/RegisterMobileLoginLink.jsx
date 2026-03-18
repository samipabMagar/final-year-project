import Link from "next/link";

const RegisterMobileLoginLink = () => {
  return (
    <div className="mt-8 text-center lg:hidden">
      <p className="text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-[#2FA4A9] hover:underline font-semibold">
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default RegisterMobileLoginLink;

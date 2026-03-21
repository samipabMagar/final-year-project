"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HOME_ROUTE } from "@/constants/routes";
import { authService } from "@/services/authService";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const currentUser = await authService.getCurrentUser();

      if (currentUser) {
        router.replace(HOME_ROUTE);
        return;
      }

      setCheckingSession(false);
    };

    checkSession();
  }, []);

  if (checkingSession) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
}

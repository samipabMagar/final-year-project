"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_PRODUCTS_ROUTE, HOME_ROUTE } from "@/constants/routes";
import { authService } from "@/services/authService";

export default function AuthLayout({ children }) {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const currentUser = await authService.getCurrentUser();

      if (currentUser) {
        const targetRoute = currentUser?.role === "admin" ? ADMIN_PRODUCTS_ROUTE : HOME_ROUTE;
        router.replace(targetRoute);
        return;
      }

      setCheckingSession(false);
    };

    checkSession();
  }, [router]);

  if (checkingSession) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
}

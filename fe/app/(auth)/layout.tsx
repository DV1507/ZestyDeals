"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useLayoutEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/dashboard");
    }
  });
  return (
    <div className="h-screen w-full  flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;

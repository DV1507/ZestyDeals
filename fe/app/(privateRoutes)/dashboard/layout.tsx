"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/");
        toast("Unauthorized, Login Again", { type: "error" });
        localStorage.clear();
      }
    }
  });
  const queryClient = new QueryClient();
  return (
    <SidebarProvider>
      <AppSidebar />
      <QueryClientProvider client={queryClient}>
        {children}{" "}
      </QueryClientProvider>
    </SidebarProvider>
  );
};

export default DashboardLayout;

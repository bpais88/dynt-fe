"use client";

import { MainNavSidebar } from "@/components/main-nav-sidebar";
import { useUser } from "@/context/UserContext";
import type React from "react";

export default function InvoicesBillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useUser<true>();

  return (
    <>
      {userId && <MainNavSidebar />}
      <main className="flex-1 overflow-auto">
        <div className="space-y-6 p-8"> {children}</div>
      </main>
    </>
  );
}

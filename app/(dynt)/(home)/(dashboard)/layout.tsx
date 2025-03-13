"use client";

import { MainNavSidebar } from "@/components/main-nav-sidebar";
import { useOrganization } from "@/context/OrganizationContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

export default function InvoicesBillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session, userId } = useUser();
  const { organization } = useOrganization();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }

    if (!userId) {
      router.push("/login");
    }
  }, [organization, router, session, user, userId]);

  return (
    <>
      {userId && <MainNavSidebar />}
      <main className="flex-1 overflow-auto">
        <div className="space-y-6 p-8"> {children}</div>
      </main>
    </>
  );
}

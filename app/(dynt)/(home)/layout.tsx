"use client";

import { useOrganization } from "@/context/OrganizationContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session, userId } = useUser();
  const { organization } = useOrganization();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // if (publicRoutes.includes(pathname)) return;
      router.push("/login");
      console.log("No Session!!!!!!");
    }

    // if (!userId) {
    //   router.push("/register/personal-details");
    // }

    const inviteId = localStorage.getItem("@inviteId");
    if (inviteId) router.push(`/invitation/${inviteId}`);

    // if (!organization) router.push("/register/company-details");
    // if (!user?.isApproved) router.push("/pending-approval");
  }, [organization, session, user, userId, router]);

  return <>{children}</>;
}

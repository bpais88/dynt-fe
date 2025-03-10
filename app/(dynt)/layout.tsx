"use client";

import ContextProviders from "@/context";
import type React from "react";

export default function DyntLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ContextProviders>{children}</ContextProviders>;
}

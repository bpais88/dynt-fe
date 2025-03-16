import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
// import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dynt.ai",
  description:
    "Intelligent financial management for freelancers and small businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex h-screen bg-background">
          {children}
          {/* <Toaster position="top-right" /> */}
        </div>
        <Analytics />
      </body>
    </html>
  );
}

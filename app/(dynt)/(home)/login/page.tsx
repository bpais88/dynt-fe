"use client";

import { loginWithOAuth } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const OAuth = useMutation(loginWithOAuth);

  const handleOAuth = async () => {
    await OAuth.mutateAsync("google");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100 w-full">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center gap-3">
          <Image
            src="https://api.dynt.ai/static/logo-192.png"
            alt="Dynt"
            width={32}
            height={32}
            className="w-14 rounded"
          />
          <h3 className="text-2xl font-bold text-gray-900">
            Sign in to Dynt.ai
          </h3>
          <p className="text-sm text-gray-600 text-center">
            Start managing your finances with Dynt.ai
          </p>
        </div>

        {/* Sign-in Button */}
        <button
          onClick={handleOAuth}
          className="w-full flex items-center justify-center cursor-pointer gap-2 mt-6 p-3 text-white bg-neutral-800 rounded-lg hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Sign In With Google</span>
        </button>
        {/* Links Section */}
        <div className="flex flex-col items-center text-sm mt-6">
          <p>
            Don’t have an account?{" "}
            <Link
              href="/register/sign-up"
              className="text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

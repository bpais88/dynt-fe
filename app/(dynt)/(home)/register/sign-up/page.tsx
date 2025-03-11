"use client";

import { signUpWithOAuth } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const OAuth = useMutation(signUpWithOAuth);

  const handleOAuth = async () => {
    await OAuth.mutateAsync("google");
  };

  return (
    <>
      <div className="grid justify-items-center gap-2">
        <Image
          src="https://api.dynt.ai/static/logo-192.png"
          alt="Dynt"
          width={80}
          height={80}
          className="w-20 rounded-lg"
        />
        <h3 className="sm:text-2xl text-2xl text-center font-bold ">
          Create your Dynt.ai account
        </h3>
        <p className="sm:text-xs text-sm text-center">
          Get started for free. No credit card required.
        </p>
      </div>
      <button onClick={handleOAuth} className="btn w-full btn-neutral my-4">
        <FcGoogle size={30} />
      </button>

      <div className="flex items-center text-sm gap-2">
        <p>Already have an account?</p>
        <Link className="link link-primary text-sm" href={"/login"}>
          Sign in
        </Link>
      </div>
    </>
  );
}

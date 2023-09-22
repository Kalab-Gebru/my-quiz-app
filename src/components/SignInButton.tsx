"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
export default function SignInButton() {
  return (
    <button
      // onClick={() => popupCenter("/api/auth/signin", "Sample Sign In")}
      onClick={() => signIn("google")}
      className="px-4 py-1 text-lg text-white bg-blue-700 rounded"
    >
      <FcGoogle size={25} />
      <span>Sign In With Google</span>
    </button>
  );
}

"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          
          {/* Left Side - Welcome Text */}
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Join Us Today! 🚀
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Create your account and start transforming images effortlessly.
            </p>
          </div>

          {/* Right Side - Clerk Sign Up Form */}
          <div className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Sign Up
            </h2>
            <SignUp />
          </div>
          
        </div>
      </div>
    </section>
  );
}

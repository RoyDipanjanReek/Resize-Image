"use client";
import { SignIn } from '@clerk/nextjs'
import React from "react";
;

export default function SignInPage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          
          {/* Left Side - Welcome Text */}
          <div className="text-center md:text-left max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Welcome Back! 👋
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Sign in to access your dashboard and start transforming images with ease.
            </p>
          </div>

          {/* Right Side - Clerk Sign In Form */}
          <div className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Sign In
            </h2>
            <SignIn />
          </div>
          
        </div>
      </div>
    </section>
  );
}






 
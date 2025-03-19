"use client";
import React from "react";
import  Transform  from  '@/photos/Transform.jpg'

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-8 px-4 md:px-12 lg:px-20">
        {/* Left Side - Text Content */}
        <div className="text-center md:text-left w-full md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Transform Your Images <br />
            <span className="text-blue-400">Effortlessly</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            Resize, crop, and enhance your images for social media and beyond.
            Quick, easy, and all in one place.
          </p>
          <div className="mt-6 flex justify-center md:justify-start">
           
          </div>
        </div>

        {/* Right Side - Image Preview */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[250px] sm:w-[300px] md:w-[350px] h-[400px] sm:h-[300px] md:h-[350px] bg-gray-700 rounded-2xl shadow-lg overflow-hidden">
            {/* Cloudinary Image Placeholder */}
            <img
              width={400}
              height={800}
              src= {Transform.src} // Replace with actual uploaded image
              sizes="100vw"
              alt="Transformed image preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

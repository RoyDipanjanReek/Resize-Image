"use client";
import React, { useEffect, useState, useRef } from "react";
import { CldImage } from "next-cloudinary";

const socialFormat = {
  "Instagram Square": {
    width: 300,
    height: 300,
    aspectRatio: "1:1",
    removeBackground: false,
  },
  "Instagram Portrait": {
    width: 300,
    height: 200,
    aspectRatio: "4:5",
    removeBackground: false,
  },
  "Twitter Post": {
    width: 200,
    height: 250,
    aspectRatio: "16:9",
    removeBackground: false,
  },
  "Twitter Header": {
    width: 600,
    height: 200,
    aspectRatio: "3:1",
    removeBackground: false,
  },
  "Facebook Cover": {
    width: 820,
    height: 312,
    aspectRatio: "205:78",
    removeBackground: false,
  },
  "Passport Photo": {
    width: 300,
    height: 300,
    aspectRatio: "1:1",
    removeBackground: false,
  },
};

type SocialFormat = keyof typeof socialFormat;

export default function TransformImage() {
  const [uplodedImage, setUplodedImage] = useState<string | null>(null);
  const [selectFormat, setSelectFormat] = useState<SocialFormat>(
    "Instagram Square"
  );

  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (uplodedImage) {
      setIsTransforming(true);
    }
  }, [selectFormat, uplodedImage]);

  const handelFileUplode = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formDate = new FormData();
    formDate.append("file", file);

    try {
      const responce = await fetch("/api/image_uplode", {
        method: "POST",
        body: formDate,
      });

      if (!responce.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await responce.json();
      setUplodedImage(data.publicId);
    } catch (error) {
      console.log("Failed to upload image", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-full h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Transform Your Image
      </h1>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose an image file</span>
            </label>
            <input
              type="file"
              onChange={handelFileUplode}
              className="file-input file-input-bordered file-input-primary w-full"
            />
          </div>
          {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
            </div>
          )}

          {uplodedImage && (
            <div className="p-4 rounded-lg shadow-md w-full mx-auto mt-10">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Select Format Section */}
                <div className="p-4  text-white rounded text-center w-full md:w-1/2">
                  <h2 className="card-title mb-4 text-white">
                    Select Social Media Format
                  </h2>

                  <div>
                    {Object.keys(socialFormat).map((format) => (
                      <button
                        type="button"
                        key={format}
                        onClick={() => {
                          console.log("Button clicked:", format);
                          setSelectFormat(format as SocialFormat);
                        }}
                        className={`btn btn-primary rounded-2xl flex justify-center flex-col my-2 ${
                          selectFormat === format ? "btn-active" : ""
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview Section */}
                <div className="p-4 text-white rounded text-center w-full md:w-1/2">
                  <h3 className="text-lg font-semibold mb-2">Preview</h3>
                  <div className="flex justify-center relative">
                    {isTransforming && (
                      <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                        <span className="loading loading-spinner loading-lg"></span>
                      </div>
                    )}
                    <CldImage
                      width={socialFormat[selectFormat].width}
                      height={socialFormat[selectFormat].height}
                      src={uplodedImage}
                      sizes="100vw"
                      alt="transformed image"
                      crop="fill"
                      aspectRatio={socialFormat[selectFormat].aspectRatio}
                      removeBackground={
                        socialFormat[selectFormat].removeBackground
                      }
                      background="yellow"
                      gravity="auto"
                      ref={imageRef}
                      onLoad={() => setIsTransforming(false)}
                    />
                  </div>
                </div>
              </div>
              {/* Download Button */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn bg-white text-black"
                >
                  Download Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

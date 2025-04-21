"use client";

import React from "react";

type Props = {
  form: {
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    dailyrate: string;
    seat: string;
    picture: string;
  };
  imageUploaded: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

export default function AddCarProviderForm({
  form,
  imageUploaded,
  handleChange,
  handleImageUpload,
  handleSubmit,
}: Props) {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 w-full h-full max-w-md space-y-4">
      <h2 className="text-xl text-black font-bold text-center">Add Rental Car</h2>

      {/* Render form fields */}
      {["name", "address", "district", "province", "postalcode", "tel", "dailyrate", "seat"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.replace(/([a-z])([A-Z])/g, "$1 $2")}
          value={form[field as keyof typeof form]}
          onChange={handleChange}
          className="bg-white text-black text-sm w-full p-2 border rounded-md"
        />
      ))}

      {/* Image upload button */}
      <div className="flex items-center space-x-2">
        <label className="bg-gray-400 text-sm px-4 py-2 rounded cursor-pointer font-semibold">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          Add picture
        </label>
        {imageUploaded && <span className="text-green-500 text-sm font-medium">Image uploaded</span>}
      </div>

      {/* Submit button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white font-bold px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

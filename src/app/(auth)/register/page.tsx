"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/material";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: "",
    password: "",
    role: "",
    picture: "",
    pictureIdCard: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRenter , setIsRenter] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const dataToSend = { ...formData } as any;
      if (!isRenter) {
        delete dataToSend.pictureIdCard;
      }
      console.log( dataToSend );

      const res = await fetch("https://api-coin-kukkik.vercel.app/api/v1/auth/register", {
      //const res = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  {/* Handle image file upload and convert to base64 */}
  const [imageUploaded, setImageUploaded] = useState(false);
  const [idCardUploaded, setIdCardUploaded] = useState(false);
  const [uploadKey, setUploadKey] = useState(Date.now());

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setFormData(prev => ({ ...prev, picture: "" }));
    setImageUploaded(false);
    setIdCardUploaded(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, picture: reader.result as string }));
      setImageUploaded(true);
      setUploadKey(Date.now());
    };
    reader.readAsDataURL(file);
  };

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, pictureIdCard: reader.result as string }));
      setIdCardUploaded(true);
      setUploadKey(Date.now());
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-cover bg-center px-10 " style={{ backgroundImage: "url('/img/carbg.jpg')" }}>
      <div className="bg-gray-200 rounded-lg bg-opacity-70">
        <div className="w-full max-w-lg p-8">
          <h1 className="text-4xl font-bold mb-4 text-[#5C4590]">Create new account</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <p className="mb-4 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" prefetch={true} className="text-[#FE7F3F] hover:underline">
              Sign In
            </Link>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center space-x-6 mb-4">
            <label htmlFor="user" className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="role" // ← FIXED
                id="user"
                value="user" // ← FIXED
                onClick={()=> setIsRenter(false)}
                onChange={handleRoleChange}

                className="form-radio text-blue-600 h-4 w-4"
              />
              <span className="ml-2 text-gray-700">User</span>
            </label>

            <label htmlFor="renter" className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="role" // ← FIXED
                id="pending-renter"
                value="pending-renter" // ← FIXED
                onClick={()=> setIsRenter(true)}
                onChange={handleRoleChange}
                className="form-radio text-blue-600 h-4 w-4"
              />
              <span className="ml-2 text-gray-700">Renter</span>
            </label>
            </div>
            <div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="tel" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                id="tel"
                name="tel"
                type="tel"
                placeholder="Phone Number"
                value={formData.tel}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Handle image */}
            <div className="flex justify-center">
              <label htmlFor="picture-upload" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out m-2 cursor-pointer">
                Profile Pic
              </label>
              <input
                key={uploadKey}
                type="file"
                id="picture-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {isRenter && (
                <>
                  <label htmlFor="idcard-upload" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out m-2 cursor-pointer">
                    Id card
                  </label>
                  <input
                    key={uploadKey}
                    type="file"
                    id="idcard-upload"
                    accept="image/*"
                    onChange={handleIdCardUpload}
                    className="hidden"
                  />
                </>
              )}
            </div>
            {(imageUploaded || idCardUploaded) && (
              <div className="text-center text-sm  text-green-600 font-medium">
                {imageUploaded && <p>Profile picture uploaded successfully</p>}
                {isRenter && idCardUploaded && <p>ID card uploaded successfully</p>}
              </div>
            )}

            <div className="flex justify-center">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-1/3 p-3 rounded-3xl text-white ${isLoading ? "bg-gray-400" : "bg-[#FE7F3F] hover:bg-[#FF5F0E] transition duration-200"}`}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
  }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: "",
    password: "",
    role: "user" // default role
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await fetch("https://fe-project-2024-2-rest-in-api.vercel.app/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-cover bg-center px-10 " style={{ backgroundImage: "url('/img/carbg.jpg')" }}>
      <div className="bg-gray-200">
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
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
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
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-1/3 p-3 rounded-3xl text-white ${isLoading ? "bg-gray-400" : "bg-[#FE7F3F] hover:bg-[#FF5F0E] transition duration-200"}`}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  }

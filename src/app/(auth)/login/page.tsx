"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.refresh();
        router.push("/");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-[90vh] flex items-center justify-start bg-cover bg-center px-10" style={{ backgroundImage: "url('/img/carbg.jpg')" }}>
        <div className="w-full max-w-lg p-8 ">
          <h1 className="text-4xl font-bold mb-6 text-[#5C4590]">Sign In</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
  
          <p className="mb-4 text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" prefetch={true} className="text-[#FE7F3F] hover:underline">
              Sign Up
            </Link>
          </p>
  
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/3 p-3 rounded-3xl text-white ${isLoading ? "bg-gray-400" : "bg-[#FE7F3F] hover:bg-[#FF5F0E] transition duration-200"}`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
}

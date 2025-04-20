"use client"
import Banner from "@/components/Banner";
import Dashboard from "@/components/Dashboard";
import { useSession } from "next-auth/react";

export default function Home() {
  
  const { data: session } = useSession();

  return (
    <main className="bg-[#FFE5B4]">
      {
      session?.user?.role === 'renter'?(
        <Dashboard/>
      ):(
        <Banner/>
      )
      }
    </main>
  );
}

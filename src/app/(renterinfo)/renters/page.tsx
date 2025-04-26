/// <reference path="../../../../interface.ts" />
import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { redirect } from "next/navigation";

export default async function RenterProfilePage() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  if (!token) redirect("/signin");

  const res = await fetch(`https://se-project-backend-31-kukkik-family.vercel.app/api/v1/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch booked cars for this renter");
  }

  const me = await res.json();

  return (
    <div className="p-6 flex flex-wrap justify-center gap-6">
      View my own profile {JSON.stringify(me)}
    </div>
  );
}


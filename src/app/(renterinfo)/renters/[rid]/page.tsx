/// <reference path="../../../../../interface.ts" />
import Profile from "@/components/Profile";
import getCarProviders from "@/libs/getCarProviders";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { redirect } from "next/navigation";

export default async function RenterProfilePage({ params }: { params: { rid: string } }) {

  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  // ถ้าไม่มี token redirect ไป login
  if (!token) redirect("/signin");

  const [userJson, carJson] = await Promise.all([
    getUserProfile(token),
    getCarProviders(""), 
  ]);

  const user: User = userJson.data;
  const allCars: CarProvider[] = carJson.data;

  const bookedCars = allCars.filter((car) =>
    car.booking.some((b) => b.user === params.rid)
  );

  return (
    <Profile user={user} bookedCars={bookedCars} />
  );
}

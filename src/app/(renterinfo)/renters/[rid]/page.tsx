/// <reference path="../../../../../interface.ts" />
import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { redirect } from "next/navigation";
import CarRenterCard from "@/components/CarRenterCard";

export default async function RenterProfilePage({ params }: { params: { rid: string } }) {

  const res = await fetch(`https://se-project-backend-31-kukkik-family.vercel.app/api/v1/carProviders/renter/${params.rid}`, {
    method: 'GET'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch booked cars for this renter");
  }

  const bookingRes = await res.json();
  const bookedCars: CarProvider[] = bookingRes.data;

  console.log(bookingRes)

  return (
    <div className="p-6 bg-[#FFE5B4] flex flex-wrap justify-center gap-6">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center gap-4">
        <div className="text-2xl font-bold">{bookingRes.name}</div>
        <div>{bookingRes.tel}</div>
        <div>{bookingRes.email}</div>
      </div>
    </div>



      {bookedCars.map((car) => (
        <CarRenterCard
          key={car.id}
          carId={car.id}
          carName={car.name}
          imgSrc={car.picture}
          price={car.dailyrate}
          seat={car.seat}
          like={car.like}
          province={car.province}
        />
      ))}
    </div>
  );
}


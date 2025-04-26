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

  /* if (!res.ok) {
    throw new Error("Failed to fetch booked cars for this renter");
  } */

  const bookingRes = await res.json();
  const bookedCars: CarProvider[] = bookingRes.data;

  return (
    <div className="p-6 bg-[#FFE5B4] flex flex-col justify-center items-center gap-6">
      <div className="text-5xl font-bold">{bookingRes.name}</div>
      <div className="bg-white text-2xl py-8 px-20 rounded-lg shadow-md flex flex-col gap-4 w-fit">
        <div>
          <span className="font-bold">tel. :</span> {bookingRes.tel}
        </div>
        <div>
          <span className="font-bold">email :</span> {bookingRes.email}
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


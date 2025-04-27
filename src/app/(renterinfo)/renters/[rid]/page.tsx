/// <reference path="../../../../../interface.ts" />
import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { redirect } from "next/navigation";
import CarRenterCard from "@/components/CarRenterCard";
import EditButton from "@/components/EditButton";
import Link from "next/link";

export default async function RenterProfilePage({ params }: { params: { rid: string } }) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/carProviders/renter/${params.rid}`, {
    method: 'GET'
  });

  /* if (!res.ok) {
    throw new Error("Failed to fetch booked cars for this renter");
  } */

  const bookingRes = await res.json();
  const bookedCars: CarProvider[] = bookingRes.data;

  return (
    <div className="p-6 bg-[#FFE5B4] flex flex-col justify-center items-center gap-6">
      <div className="text-5xl font-bold text-black">{bookingRes.name}</div>
      <div className="bg-white text-2xl py-8 px-20 rounded-lg shadow-md flex flex-col gap-4 w-fit relative">
        <div className="text-black">
          <span className="font-bold text-black">tel. :</span> {bookingRes.tel}
        </div>
        <div className=" text-black">
          <span className="font-bold text-black">email :</span> {bookingRes.email}
        </div>
        <div className="absolute bottom-4 right-4">
          <EditButton/>
        </div>
        
      </div>

      <div className="m-4 flex flex-row content-around justify-around flex-wrap gap-3">
        {bookedCars.map((car) => (
          <Link href={`/cars/${car.id}`} className="w-[250px] flex" prefetch={true}>
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
          </Link>
        ))}

      </div>


    </div>
  );
}


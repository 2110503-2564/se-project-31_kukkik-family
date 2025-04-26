/// <reference path="../../../../../interface.ts" />
import Profile from "@/components/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; 
import { redirect } from "next/navigation";
import CarRenterCard from "@/components/CarRenterCard";

export default async function RenterProfilePage({ params }: { params: { rid: string } }) {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const renterId = session?.user?._id;

  if (!token) redirect("/signin");

  const res = await fetch(`http://localhost:5000/api/bookings/renter/${renterId}/rentals`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch booked cars for this renter");
  }

  const bookingRes = await res.json();
  const bookedCars: CarProvider[] = bookingRes.data;

  return (
    <div className="p-6 flex flex-wrap justify-center gap-6">
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


/* import Link from "next/link";
import Card from "./Card";
import SortButtons from "./SortButtons";

export default async function CarCatalog({CarProviderJson}: {CarProviderJson: Promise<CarProviderJson>;}) {
  const CarProviderJsonReady = await CarProviderJson;
  return (
    <>
    <div className="flex items-center justify-between mb-6">
      <SortButtons />
      <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
        {CarProviderJsonReady.count} cars found
      </div>
    </div>
      <div className="m-4 flex flex-row content-around justify-around flex-wrap gap-6">
        {CarProviderJsonReady.data.map((data:CarProvider) => (
          <Link href={`/cars/${data.id}`} className="w-[250px] flex" prefetch={true}>
            <Card
              key={data.name}
              carId={data.id}
              carName={data.name}
              imgSrc={data.picture}
              price={data.dailyrate}
              seat={data.seat}
              like={data.like}
              province={data.province}
            />
          </Link>
        ))}
      </div>
    </>
  );
} */


/* import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    return (
        <main className="min-h-screen bg-[#FFE5B4] flex flex-col items-center justify-center p-6 space-y-6">
            <div className="text-2xl font-semibold">{ *//*ใส่ชื่อ user; get name */{/* }</div>
   
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-lg space-y-2 text-center">
                <div>tel. : </div>
                <div>email. : </div>
            </div>

            <div className="bg-grey rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-lg space-y-2 text-center"> */}
                {/*ใส่ 3 product card รถ 3 คัน*/}
{/*             </div>
        </main>
    );
} */}

import { useRouter } from "next/navigation";

import  CarRenterCard  from "./CarRenterCard";

interface ProfileProps {
  user: User;
  bookedCars: CarProvider[];
}

export default async function Profile({ user }: ProfileProps) {
 
    return (
        <main className="min-h-screen bg-[#FFE5B4] flex flex-col items-center justify-center p-6 space-y-6">
            <div className="text-2xl font-semibold">{/*ใส่ชื่อ user; get name */} {user.name}</div>
   
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-lg space-y-2 text-center">
                <div><strong>tel.</strong> : {user.tel}</div>
                <div><strong>email</strong> : {user.email}</div>
            </div>

            <div className="flex flex-row flex-wrap justify-center gap-6 bg-grey rounded-2xl shadow-lg p-6 w-[90%] max-w-5xl">
            
            
            </div>
        </main>
    );
}

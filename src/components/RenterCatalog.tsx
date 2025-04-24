import Link from "next/link";
import RenterCard from "./RenterCard";

export default async function RenterCatalog({ RenterDataJson }: { RenterDataJson: Promise<any> }) {
    const RenterDataReady = await RenterDataJson;
  return (
    <>
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
        {RenterDataReady.count} pending renter(s) found
      </div>
    </div>
      <div className="m-4 flex flex-row content-around justify-around flex-wrap gap-6">
        {RenterDataReady.data.map((data:RenterCardProps) => (
            <RenterCard
                name={data.name}
                tel={data.tel}
                email={data.email}
                selfiePicture={data.selfiePicture}
                idCardPicture={data.idCardPicture}
            />
        ))}
      </div>
    </>
  );
}

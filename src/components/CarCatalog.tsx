import Link from "next/link";
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
}

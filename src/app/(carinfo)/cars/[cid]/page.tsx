import Image from "next/image";
import getCarProvider from "@/libs/getCarProvider";
import Link from "next/link";

export default async function carDetailPage({ params }: { params: { cid: string } }) {
    const carDetail = await getCarProvider(params.cid);

    return (
        <main className="flex justify-center items-center min-h-[90vh] bg-[#FFD8A3] p-6">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    {carDetail.data.name}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ภาพรถ */}
                    <div className="flex justify-center">
                        <Image
                            src={carDetail.data.picture}
                            alt="Car Image"
                            width={500} height={300}
                            className="rounded-lg shadow-md w-full object-cover"
                        />
                    </div>

                    <div className="text-left space-y-3 text-gray-700">
                        <p className="text-lg font-medium text-gray-900">📌 Name: {carDetail.data.name}</p>
                        <p>🏠 Address: {carDetail.data.address}</p>
                        <p>📍 District: {carDetail.data.district}</p>
                        <p>🏙️ Province: {carDetail.data.province}</p>
                        <p>📮 Postal Code: {carDetail.data.postalcode}</p>
                        <p>📞 Tel: {carDetail.data.tel}</p>
                        <p className="text-lg font-semibold text-orange-600">💰 Daily Rate: {carDetail.data.dailyrate} ฿</p>
                        
                        <div className="mt-5">
                            <Link href={`/booking?carProviderId=${params.cid}`}>
                                <button className="w-full px-4 py-3 text-white bg-[#FE7F3F] hover:bg-[#F75C2C] rounded-lg shadow-md transition duration-300">
                                    🚗 Make Booking
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    return (
        <main className="min-h-screen bg-[#FFE5B4] flex flex-col items-center justify-center p-6 space-y-6">
            <div className="text-2xl font-semibold">{/*ใส่ชื่อ user; get name */}</div>
   
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-lg space-y-2 text-center">
                <div>tel. : </div>
                <div>email. : </div>
            </div>

            <div className="bg-grey rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-lg space-y-2 text-center">
                {/*ใส่ 3 product card รถ 3 คัน*/}
            </div>
        </main>
    );
}
    
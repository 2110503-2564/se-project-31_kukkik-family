import OrderList from "./OrderList";
import ProfileCard from "./ProfileCard";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    const router = useRouter();
    return (
            <div className="w-[100%] h-[90%] grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-4 bg-white p-5 space-y-10">

                <div className="col-span-2 flex justify-center">
                    <ProfileCard />
                </div>
            <div className="col-span-2 flex justify-center space-x-5">
                    <div className="h-[40vh] w-[50vw] bg-yellow-300 rounded-md shadow-md"></div>
                    <OrderList />
                </div>
                <div className="col-span-2 flex justify-center ">
                    <div className="w-[300px] h-[10vh] bg-lime-300 rounded-md shadow-md flex items-center justify-center cursor-pointer hover:bg-lime-400 transition-colors duration-200"
                    onClick={() => router.push('/wallet')}>
                        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                            Go To Wallet
                        </h1>
                    </div>
                </div>

            </div>
    )
}   
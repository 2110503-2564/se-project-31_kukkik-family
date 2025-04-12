export default function Dashboard(){
    return (
            <div className="w-[100%] h-[90%] grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-4 bg-white p-5">

                <div className="col-span-2 flex justify-center">
                    <div className="w-[300px] h-[25vh] bg-pink-300 rounded-md shadow-md "></div>
                </div>
            <div className="col-span-2 flex justify-center space-x-5">
                    <div className="h-[40vh] w-[50vw] bg-yellow-300 rounded-md shadow-md"></div>
                    <div className="h-[40vh] w-[30vw] bg-cyan-300 rounded-md shadow-md"></div>
                </div>
                <div className="col-span-2 flex justify-center">
                    <div className="w-[300px] h-[10vh] bg-lime-300 rounded-md shadow-md"></div>
                </div>

            </div>
    )
}
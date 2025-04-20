"use client"
import getCarProviders from "@/libs/getCarProviders"
import CarCatalog from "@/components/CarCatalog"
import { Suspense, useEffect, useState } from "react"
import { LinearProgress, Snackbar } from "@mui/material"
import { useSearchParams } from "next/navigation";
import Filter from "@/components/Filter"

export default function Venue() {
    let searchParams = useSearchParams();
    const [carProviders, setCarProviders] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // เตรียม string สำหรับเก็บ query URL
            let url = "";

            // ดึงค่าต่าง ๆ จาก searchParams
            let minprice = searchParams.get('minprice');
            let maxprice = searchParams.get('maxprice');
            let minseat = searchParams.get('minseat');
            let maxseat = searchParams.get('maxseat');
            let relevance = searchParams.get('relevance');
            let province = searchParams.get('province');
            let toplike = searchParams.get('toplike');
            let seat = searchParams.get('seat');
            let page = searchParams.get('page');
            let limit = searchParams.get('limit');
            let price = searchParams.get('price');

            // ต่อ query string หากค่าต่าง ๆ ไม่ว่างเปล่า
            if(minprice != "" && minprice != null){
                url += `minprice=${minprice}&`;
            }
            if(maxprice != "" && maxprice != null){
                url += `maxprice=${maxprice}&`;
            }
            if(minseat != "" && minseat != null){
                url += `minseat=${minseat}&`;
            }
            if(maxseat != "" && maxseat != null){
                url += `maxseat=${maxseat}&`;
            }  
            if(relevance != "" && relevance != null){
                url += `relevance=${relevance}&`;
            }
            if(province != "" && province != null){
                url += `province=${province}&`;
            }  
            if(toplike != "" && toplike != null){
                url += `toplike=${toplike}&`;
            }
            if(seat != "" && seat != null){
                url += `seat=${seat}&`;
            }
            if(page != "" && page != null){
                url += `page=${page}&`;
            }
            if(limit != "" && limit != null){
                url += `limit=${limit}&`;
            }
            if(price != "" && price != null){
                url += `price=${price}&`;
            }
            
            // ดึงข้อมูลจาก backend และอัปเดต state
            const providers = await getCarProviders(url);
            setCarProviders(providers);
        };

        fetchData();
    }, [searchParams]);

    return (
        <main className="flex flex-row">
            <div className="w-1/5  border-r h-screen block fixed top-[10%]">
                <Filter></Filter>
            </div>
            <div className="w-4/5 p-2 ml-auto">
                <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                    {carProviders ? (
                        <CarCatalog CarProviderJson={carProviders}></CarCatalog>
                    ) : (
                        <p>No data available</p>
                    )}
                </Suspense>
            </div>
        </main>
    )
}
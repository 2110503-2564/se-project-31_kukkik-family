import React from 'react';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getTopSale } from '@/libs/getTopSale';
import { getCoins } from '@/libs/getCoins';

const AllTimeIncomeComponent: React.FC = () => {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState(0);

  const [topsales, setTopsales] = useState<BookingData[]>([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
      const fetchTopSale = async () => {
        if (!token) {
          setLoading(false);
          return <div>No Token</div>;
        }
        try {
          const data = await getTopSale(token); // Fetch bookings with token
          const coin = await getCoins(token); // Fetch coins with token
          setTopsales(data.data);
          setCoins(coin.coin);
          setTotalSales(data.count);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setLoading(false);
        }
      };
  
    fetchTopSale();
    }, [token]);

  return (
    <div className="bg-white rounded-[20px] shadow-md p-6 w-[400px] text-black">
      <p className="text-md font-semibold mb-1">
        Number of all-time sales
        <span className="ml-2 font-normal">:
          {loading ? (
            "Loading..."
          ) :
            (
              `${totalSales} cars`
          )}           
           </span>
      </p>
      <p className="text-md font-semibold mb-2">
        All-time income
        <span className="ml-2 font-normal">:
          {loading ? (
            "Loading..."
          ) :
          ( 
            `${coins} coins`
          )}
        </span>
      </p>

      <p className="text-md font-semibold mb-2">Top 3 best car sells of all-time:</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
      <ol className="list-decimal list-inside text-base ml-2 space-y-1">
        {topsales.map((car, index) => (
          <li key={index}>{car.name}</li>
        ))}
      </ol>
      )}

    </div>
  );
};

export default AllTimeIncomeComponent;

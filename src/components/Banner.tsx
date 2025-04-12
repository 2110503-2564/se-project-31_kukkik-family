"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import PriceAndSeat from "./PriceAndSeat";

export default function Banner() {
  
  const maximumPrice = 50000;
  const maximumSeat = 300;
  const minimum = 1;
  
  const [priceRange, setPriceRange] = useState([1,50000]);
  const [seatRange, setSeatRange] = useState([1,300]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minSeat, setMinSeat] = useState(0);
  const [maxSeat, setMaxSeat] = useState(300);

  const setterPriceRange = (price: number[]) => {
    setPriceRange(price);
    setMinPrice(price[0]);
    setMaxPrice(price[1]);
  }

  const setterSeatRange = (seat: number[]) => {
    setSeatRange(seat);
    setMinSeat(seat[0]);
    setMaxSeat(seat[1]);
  }

  const setterMinPrice = (price: number) => {
    let newMinPrice;

    if (price > maximumPrice ) {
      newMinPrice = maximumPrice;
    } else if (price < minimum) {
      newMinPrice = minimum;
    } else if (price > maxPrice) {
      newMinPrice = maxPrice;
    } else {
      newMinPrice = price;
    }

    setMinPrice(newMinPrice);
    setPriceRange([newMinPrice, priceRange[1]]);
  }

  const setterMaxPrice = (price: number) => {
    let newMaxPrice;

    if (price > maximumPrice) {
      newMaxPrice = maximumPrice;
    } else if (price < minimum) {
      newMaxPrice = minimum;
    } else if (price < minPrice) {
      newMaxPrice = minPrice;
    } else {
      newMaxPrice = price;
    }

    setMaxPrice(newMaxPrice);
    setPriceRange([priceRange[0], newMaxPrice]);
  }

  const setterMinSeat = (seat: number) => {
    let newMinSeat;

    if (seat > maximumSeat) {
      newMinSeat = maximumSeat;
    } else if (seat < minimum) {
      newMinSeat = minimum;
    } else if (seat > maxSeat) {
      newMinSeat = maxSeat;
    } else {
      newMinSeat = seat;
    }

    setMinSeat(newMinSeat);
    setSeatRange([newMinSeat, seatRange[1]]);
  }

  const setterMaxSeat = (seat: number)=>{
    if(seat > maximumSeat){
      setMaxSeat(maximumSeat);
    }
    else if(seat < minimum){
      setMaxSeat(minimum);
    } else if (seat < minSeat) {
      setMaxSeat(minSeat);
    } else{
      setMaxSeat(seat);
    }
    setSeatRange([seatRange[0], maxSeat]);
  }



  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {    // router.push(`/cars?minprice=${minPrice}&maxprice=${maxPrice}&minseat=${minSeat}&maxseat=${maxSeat}&relevance=&province=&toplike=&price=&seat=&page=&limit=`);
    router.push(`/cars?minprice=${minPrice}&maxprice=${maxPrice}&minseat=${minSeat}&maxseat=${maxSeat}`);

  };

  const router = useRouter();

  const { data: session } = useSession();
  console.log(session?.user.token);

  return (

    <div className="p-5 m-0 w-full h-[90vh] relative">
      <Image
        src={"/img/cover1.png"}
        alt="Event"
        fill={true}
        priority={true}
        style={{ objectFit: "cover" }}
      />
      <div className={styles.bannerText}>
        <h1 className="text-6xl font-semibold text-[#5C4590]">
          Fast And Easy Way <br /> To Rent A Car
        </h1>
      </div>
        <div className="absolute bottom-10 left-10 transform -translate-y-20 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg z-20 w-80 flex flex-col gap-4">

      <PriceAndSeat
        minimum={minimum}
        maximumSeat={maximumSeat}
        maximumPrice={maximumPrice}
        minSeat={minSeat}
        maxSeat={maxSeat}
        minPrice={minPrice}
        maxPrice={maxPrice}
        seatRange={seatRange}
        priceRange={priceRange}
        setterSeatRange={setterSeatRange}
        setterPriceRange={setterPriceRange}
        setterMinSeat={setterMinSeat}
        setterMaxSeat={setterMaxSeat}
        setterMinPrice={setterMinPrice}
        setterMaxPrice={setterMaxPrice}
      />  
      <button className="bg-[#FE7F3F] text-white border-none 
          font-bold py-3 px-5 rounded-md shadow-lg transition-transform duration-300 hover:scale-105 w-full text-center"
          onClick={handleClick}>
            Search
      </button>
      </div>
    </div>

  );
}


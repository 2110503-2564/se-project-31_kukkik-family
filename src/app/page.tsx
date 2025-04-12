"use client"
import { useState } from "react";
import Banner from "@/components/Banner";
import Link from "next/link";

export default function Home() {
  
  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  // };

  return (
    <main>
      <Banner/>
      {/* <Link href="/cars" prefetch={true} >
        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none 
        font-bold py-3 px-5 m-4 rounded-md z-30 absolute bottom-8 left-1/2 transform -translate-x-1/2
        shadow-lg transition-transform duration-300 hover:scale-105"
        onClick={handleClick}>
            Search
        </button>
      </Link> */}
    </main>
  );
}

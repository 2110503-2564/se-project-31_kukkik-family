"use client";

import { useEffect, useState } from "react";
import RenterCard from "./RenterCard";
import { useSession } from "next-auth/react";

export default function RenterCatalog({ renterData: initialData }: { renterData: any }) {
  const { data: session } = useSession();
  const [renterData, setRenterData] = useState(initialData);

  const removeRenterFromList = (id: string) => {
    setRenterData((prev: any) => ({
      ...prev,
      data: prev.data.filter((renter: any) => renter.id !== id),
      count: prev.count - 1,
    }));
  };

  const handleAction = async (id: string, action: "accept" | "deny") => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/users/renter-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        console.log(`${action} success`);
        removeRenterFromList(id);
      } else {
        console.error(`${action} failed`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!renterData) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 flex">Renter Requests</h1>
        <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full flex">
          {renterData.count} pending renter(s) found
        </div>
      </div>
      <div className="p-4 flex flex-row content-around justify-around flex-wrap gap-6">
        {renterData.data.map((data: any) => (
          <RenterCard
            key={data.id}
            id={data.id}
            name={data.name}
            tel={data.tel}
            email={data.email}
            selfiePicture={data.selfiePicture}
            idCardPicture={data.idCardPicture}
            onApprove={() => handleAction(data.id, "accept")}
            onDeny={() => handleAction(data.id, "deny")}
          />
        ))}
      </div>
    </>
  );
}

"use client";
import { useEffect, useState, Suspense } from "react";
import getRenterRequests from "@/libs/getPendingRenters";
import RenterCatalog from "@/components/RenterCatalog";
import { LinearProgress } from "@mui/material";
import { useSession } from 'next-auth/react';

export default function RenterPage() {
  const [renterList, setRenterList] = useState(null);
  const { data: session} = useSession();
  if(session == null)return;
  useEffect(() => {
    const fetchRenters = async () => {
      const data = await getRenterRequests(session.user.token);
      setRenterList(data);
    };
    fetchRenters();
  }, []);

  return (
    <main className="p-6 bg-[#FFD8A3] min-h-[90vh]">
      <Suspense fallback={<LinearProgress />}>
        {renterList ? (
          <RenterCatalog renterData={renterList} />
        ) : (
          <p>No renter data available</p>
        )}
      </Suspense>
    </main>
  );
}

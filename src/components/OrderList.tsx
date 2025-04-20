"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Order = {
  id: string;
  status: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivering":
      return "text-yellow-500";
    case "Available":
      return "text-green-500";
    case "Rented":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

export default function OrderList() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Session:", session);
  console.log("Status:", status);
    const fetchOrders = async () => {
<<<<<<< HEAD
      try {
        const token = session?.user?.token;
        const renterId = session?.user?._id;

        console.log("Token from session:", token);
    console.log("Renter ID from session:", renterId);

        if ( !renterId) {
          console.warn("Missing token or renterId from session");
          return;
        }

        const url = `https://localhost:5000/api/v1/bookings/renter/${renterId}/rentals`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        console.log("Fetched bookings data:", json);

        if (json.success) {
          setOrders(json.data);
        } else {
          console.error("Failed to fetch bookings:", json.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
||||||| 41a5e6e
      const token = localStorage.getItem("token");
  
      const res = await fetch("https://se-project-backend-31-kukkik-family.vercel.app//api/v1/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const json = await res.json();
      if (json.success) {
        setOrders(json.data); 
      } else {
        console.error("Failed to fetch bookings:", json.message);
=======
      const token = localStorage.getItem("token");
  
      const res = await fetch("https://se-project-backend-31-kukkik-family.vercel.app/api/v1/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const json = await res.json();
      if (json.success) {
        setOrders(json.data); 
      } else {
        console.error("Failed to fetch bookings:", json.message);
>>>>>>> 351cee92822f9732551898280b14e32d0d096d0c
      }
    };

    if (status === "authenticated") {
      fetchOrders();
    }
  }, [session, status]);

  return (
    <div className="h-[40vh] w-[30vw] bg-cyan-300 rounded-md shadow-md p-5 overflow-y-auto">
      <h2 className="text-lg font-bold mb-3">Order List:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-1">
          {orders.map((order, index) => (
            <li key={index}>
              <span className="font-semibold">{order.id}</span> :{" "}
              <span className={getStatusColor(order.status)}>{order.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

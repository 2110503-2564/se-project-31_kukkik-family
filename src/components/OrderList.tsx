// components/OrderList.tsx
import { useEffect, useState } from "react";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchOrders = async () => {
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
      }
    };
  
    fetchOrders();
  }, []);
  

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

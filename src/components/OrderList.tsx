// components/OrderList.tsx
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
type Order = {
  id: string;
  status: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "received":
      return "text-yellow-500";
    case "returned":
      return "text-green-500";
    case "rented":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const token = session?.user?.token;

      const res = await fetch("https://se-project-backend-31-kukkik-family.vercel.app/api/v1/bookings/renter/rentals", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // ส่ง Token ใน Header
        },
      });

      const json = await res.json();
      if (json.success) {
        setLoading(false);
        setOrders(json.data);
        console.log(orders)
      } else {
        console.error("Failed to fetch bookings:", json.message);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className="h-[40vh] w-[30vw] bg-cyan-300 rounded-md shadow-md p-5 overflow-y-auto">
      <h2 className="text-lg font-bold mb-1">Order List:</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-1">
          {orders.map((order, index) => (
            <li key={index}>
              <span >{order._id}</span> : {" "}
              <span className={getStatusColor(order.status)}>{order.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
// components/OrderList.tsx
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
type Order = {
  _id: string;
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/v1/bookings/renter/rentals`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // ส่ง Token ใน Header
        },
      });

      
      const json = await res.json();
      console.log(json)
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
    <div className="h-[40vh] w-[30vw] bg-white rounded-[20px] shadow-md p-6 w-[400px] text-black p-5 overflow-y-auto">
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
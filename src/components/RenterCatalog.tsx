import Link from "next/link";
import RenterCard from "./RenterCard";
import { useSession } from 'next-auth/react';

export default async function RenterCatalog({ RenterDataJson }: { RenterDataJson: Promise<any> }) {
  const { data: session } = useSession();
  /*
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/users/renter-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({ action: 'accept' }),
      });

      if (res.ok) {
        console.log('Approved successfully');
       
      } else {
        console.error('Approval failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeny = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/users/renter-requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({ action: 'deny' }),
      });

      if (res.ok) {
        console.log('Denied successfully');
      } else {
        console.error('Deny failed');
      }
    } catch (err) {
      console.error(err);
    }
  }; */

    const RenterDataReady = await RenterDataJson;
  return (
    <>
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
        {RenterDataReady.count} pending renter(s) found
      </div>
    </div>
      <div className="p-4 flex flex-row content-around justify-around flex-wrap gap-6">
        {RenterDataReady.data.map((data:RenterCardProps) => (
            <RenterCard
                id={data.id}
                name={data.name}
                tel={data.tel}
                email={data.email}
                selfiePicture={data.selfiePicture}
                idCardPicture={data.idCardPicture}
                /*onApprove={() => handleApprove(data.id)}
                onDeny={() => handleDeny(data.id)}*/
            />
        ))}
      </div>
    </>
  );
}

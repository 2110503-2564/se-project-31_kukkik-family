import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

type ProfileResponse = {
  success: boolean;
  data: {
    name: string;
  };
};

export default function ProfileCard() {
  const [name, setName] = useState("");
  const { data: session } = useSession();

  return (
    <div className="w-[500px] h-[5vh]">
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "bold",
        textAlign:"center",
        color: "#000",
      }}>
        {session?.user?.name || "Loading..."}
      </h1>
    </div>
  );
}

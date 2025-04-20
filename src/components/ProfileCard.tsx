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
  <style jsx>{`
    @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;700&display=swap');
  `}</style>
  <h1 style={{
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    fontFamily: "'Chakra Petch', sans-serif"
  }}>
    {session?.user?.name || "Loading..."}
  </h1>
</div>

  );
}

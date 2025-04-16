'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function QRPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [confirming, setConfirming] = useState(false);
  const [outOfTime, setOutOfTime] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);

  // redirect if not login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // show coin
  useEffect(() => {
    const storedCoin = localStorage.getItem('selectedCoin');
    if (storedCoin) {
      setSelectedCoin(parseInt(storedCoin));
    }
  }, []);

  // countdown for 10-minute timer
  useEffect(() => {
    if (confirming || countdown <= 0) {
      if (countdown <= 0) setOutOfTime(true);
      return;
    }
  
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [countdown, confirming]);
  

  // handle redirect after 5 seconds on confirm or out of time
  useEffect(() => {
    if ((confirming || outOfTime) && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (redirectCountdown === 0) {
      router.push('/wallet'); // Redirect to wallet page
    }
  }, [confirming, outOfTime, redirectCountdown, router]);

  const handleConfirm = () => {
    setConfirming(true);
    // TODO: Call updateCoin API here
    // await fetch('/api/updateCoin', { method: 'POST', body: JSON.stringify({ ... }) });
  };

  const handleCancel = () => {
    router.push('/wallet');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // loading session
  if (status === 'loading' || status === 'unauthenticated') return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFD8A3]">
      {/* QR Code Box */}
      <div className="p-6 bg-white rounded-3xl shadow-md">
        {/* TODO: Replace with API-generated QR */}
        <Image
          src="/img/mockqr.png"
          alt="QR Code"
          width={200}
          height={200}
        />
        {selectedCoin !== null && (
          <p className="text-black text-xl text-center font-bold mt-5">
          {selectedCoin} COINS
          </p>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-500 text-xl">Scheduled Time</p>
        <p className="text-black text-3xl font-bold">{formatTime(countdown)}</p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow active:translate-y-[1px]"
        >
          CANCEL
        </button>
        <button
          onClick={handleConfirm}
          className="bg-green-500 text-white font-bold px-6 py-3 rounded-xl shadow active:translate-y-[1px]"
        >
          CONFIRM
        </button>
      </div>

      {/* Confirm Popup */}
      {(confirming || outOfTime) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-3xl shadow-lg text-center py-12 w-80">
            <Image
              src={outOfTime ? '/img/false.png' : '/img/true.png'}
              alt="Status Icon"
              width={120}
              height={120}
              className="mx-auto pb-5"
            />
            <h2 className="text-3xl font-bold text-black pb-1">
              {outOfTime ? 'Out of time' : 'Redirect'}
            </h2>
            <p className="text-gray-600">
              {outOfTime
                ? `try again in ${redirectCountdown} secs...`
                : `in ${redirectCountdown} secs...`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

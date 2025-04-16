'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getQR } from '@/libs/getQR';
import { redeemCoins } from '@/libs/redeemCoins';
import { useSearchParams } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import Image from 'next/image';

export default function QRPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds
  const [confirming, setConfirming] = useState(false);
  const [outOfTime, setOutOfTime] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);
  const [qrCode, setQRCode] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const amountParam = searchParams.get('amount');

  // Redirect to login if user is unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Retrieve coin selection and generate QR code from API
  useEffect(() => {
    const fetchQRCode = async () => {
      const coin = amountParam ? parseInt(amountParam) : null;
      if (coin && session?.user?.token) {
        setSelectedCoin(coin);
        try {
          const code = await getQR(session.user.token, coin);
          setQRCode(code);
        } catch (error) {
          console.error('Failed to get QR code:', error);
        }
      }
    };

    fetchQRCode();
  }, [session, amountParam]);

  // Countdown for QR validity
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

  // Countdown for redirect after confirming or timing out
  useEffect(() => {
    if ((confirming || outOfTime) && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (redirectCountdown === 0) {
      router.push('/wallet');
    }
  }, [confirming, outOfTime, redirectCountdown, router]);

  // Handle confirm and redeem coin using QR code
  const handleConfirm = async () => {
    if (!qrCode) return;
    setConfirming(true);
    try {
      await redeemCoins(qrCode);
    } catch (error) {
      console.error('Failed to redeem coins:', error);
    }
  };

  // Cancel and go back to wallet page
  const handleCancel = () => {
    router.push('/wallet');
  };

  // Format countdown to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Show nothing if loading or unauthenticated
  if (status === 'loading' || status === 'unauthenticated') return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFD8A3]">
      {/* QR Code Section */}
      <div className="p-6 bg-white rounded-3xl shadow-md">
        {qrCode ? (
          <QRCodeCanvas value={qrCode} size={200} />
        ) : (
          <p className="text-gray-600">Loading QR...</p>
        )}
        {selectedCoin !== null && (
          <p className="text-black text-xl text-center font-bold mt-5">
            {selectedCoin} COINS
          </p>
        )}
      </div>

      {/* Countdown timer */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-xl">Scheduled Time</p>
        <p className="text-black text-3xl font-bold">{formatTime(countdown)}</p>
      </div>

      {/* Action Buttons */}
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
          disabled={!qrCode}
        >
          CONFIRM
        </button>
      </div>

      {/* Overlay popup on confirm or timeout */}
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

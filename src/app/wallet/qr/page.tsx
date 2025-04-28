'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getQR } from '@/libs/getQR';
import { useSearchParams } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';
import { redeemStatus } from '@/libs/redeemStatus';
import Image from 'next/image';

export default function QRPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [countdown, setCountdown] = useState(300); // count down QR code 5 mins
  const [confirmed, setConfirmed] = useState(false); // confirm button
  const [outOfTime, setOutOfTime] = useState(false); // out of time
  const [redirectCountdown, setRedirectCountdown] = useState(5); // count down pop up 5 secs
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);
  const [qrCode, setQRCode] = useState<string | null>(null);
  const [codeUrl, setCodeUrl] = useState<string | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const amountParam = searchParams.get('amount');

  // redirect if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // get QR code
  useEffect(() => {
    const fetchQRCode = async () => {
      const coin = amountParam ? parseInt(amountParam) : null;
      if (coin && session?.user?.token) {
        setSelectedCoin(coin);
        try {
          const code = await getQR(session.user.token, coin);
          setQRCode(code);
          setCodeUrl(code);
          
          const codeId = code?.split('/').pop() || '';
          if (!codeId) return console.warn('Invalid codeUrl');
          setQrId(codeId);
          

        } catch (error) {
          console.error('Failed to get QR code:', error);
        }
      }
    };

    fetchQRCode();
  }, [session, amountParam]);

  // countdown for QR validity
  useEffect(() => {
    if (confirmed || countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, confirmed]);

  // handle timeout (5 mins)
  useEffect(() => {
    if (countdown <= 0 && !confirmed) {
      setOutOfTime(true);
    }
  }, [countdown, confirmed]);

  // redirect countdown after confirm or timeout
  useEffect(() => {
    if ((confirmed || outOfTime) && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (redirectCountdown === 0) {
      router.push('/wallet');
    }
  }, [confirmed, outOfTime, redirectCountdown, router]);

  // handle confirm button
  const handleConfirm = () => {
    setConfirmed(true);
    setCountdown(0);
    setOutOfTime(false);
  };

  //check qr code valid
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // console.log( qrCode );
        // console.log( codeUrl );

        const code = codeUrl?.split('/').pop() || '';
        if (!code) return console.warn('Invalid codeUrl');
        //console.log(code);
        const data = await redeemStatus( code );
        //console.log( data.status );
        if( data.status === 'invalid')
        {
          handleConfirm();
        }
        
        //const data = await res.json();
        //console.log('Checked API:', data);

        // if (data.status === 'done') {
        //   clearInterval(interval); // stop checking
        //   router.push('/done-page');
        // }333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333222222222222222222222222222233333us', err);
      }
      catch(err){
        console.log(err);
      }
    }, 1000); // poll every 1 seconds
    return () => clearInterval(interval); // cleanup on unmount
  }, [codeUrl, router, qrCode]);

  const handleCancel = () => {
    router.push('/wallet');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (status === 'loading' || status === 'unauthenticated') return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFD8A3]">
      {/* QR code section */}
      {qrId && (
        <div id="qr-id" data-qrid={qrId} className='display: none;' >
          {qrId}
        </div>
      )}
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

      {/* countdown timer */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-xl">Scheduled Time</p>
        <p className="text-black text-3xl font-bold">{formatTime(countdown)}</p>
      </div>

      {/* cancel and confirm buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white font-bold px-6 py-3 rounded-xl shadow active:translate-y-[1px]"
        >
          CANCEL
        </button>
        {/*<button
          onClick={handleConfirm}
          className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl shadow active:translate-y-[1px]"
        >
          CONFIRM
        </button> */}
      </div>

      {/* overlay popup */}
      {(confirmed || outOfTime) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-3xl shadow-lg text-center py-12 w-80">
            <Image
              src={confirmed ? '/img/true.png' : '/img/false.png'}
              alt="Status Icon"
              width={120}
              height={120}
              className="mx-auto pb-5"
            />
            <h2 className="text-3xl font-bold text-black pb-1">
              {confirmed ? 'Success' : 'Out of time'}
            </h2>
            <p className="text-gray-600">Redirecting in {redirectCountdown} secs...</p>
          </div>
        </div>
      )}
    </div>
  );
}

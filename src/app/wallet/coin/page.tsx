'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { deductCoins } from '@/libs/deductCoins';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function CoinPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);
  const [customValue, setCustomValue] = useState('');
  const [customConfirmed, setCustomConfirmed] = useState(false);
  const [lastClicked, setLastClicked] = useState<'preset' | 'custom' | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [deductComplete , setDeductComplete] = useState(false);
  const role = session?.user?.role // get role from session

  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  // redirect if not login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const coinOptions = [100, 200, 300, 400, 500];

  const handleCoinSelect = (coin: number) => {
    setSelectedCoin(coin);
    setCustomConfirmed(false);
    setLastClicked('preset');
  };

  

  const handleCustomClick = () => {
    setCustomValue('');
    setCustomConfirmed(false);
    setLastClicked('custom');
  };

  const handleConfirm = () => {
    const value = parseInt(customValue || '0'); // ✅ ป้องกัน customValue ว่าง
    if (isNaN(value) || value < 100) {
      alert('Please enter at least 100 coins');
      return;
    }
    setSelectedCoin(value);
    setCustomConfirmed(true);
    setLastClicked('custom');
  };

  const handleAddCoins = () => {
    if (selectedCoin === null) {
      alert('Please select a coin amount');
      return;
    }
    
    router.push(`/wallet/qr?amount=${selectedCoin}`); // ส่งผ่าน query string แทน
  };
  // redirect countdown after confirm or timeout
  useEffect(() => {
    if (deductComplete && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (redirectCountdown === 0) {
      router.push('/wallet');
    }
  }, [ redirectCountdown, router , deductComplete]);

  const handleCashOut = async () =>{
    if (selectedCoin === null) {
      alert('Please select a coin amount');
      return;
    }

    const data = await deductCoins( session?.user.token || "" , selectedCoin );
    if( data )
    {
      setDeductComplete(true);
      console.log( data );
    }

  };

  if (status === 'loading' || status === 'unauthenticated') return null;

  return (
    <div className="min-h-screen text-black bg-[#FFD8A3] flex flex-col items-center justify-center space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {coinOptions.map((coin) => (
          <button
            key={coin}
            onClick={() => handleCoinSelect(coin)}
            className={`w-40 h-28 rounded-xl text-2xl font-bold shadow transition ${
              selectedCoin === coin && lastClicked === 'preset' ? 'bg-gray-300' : 'bg-white'
            }`}
          >
            {coin} <br /> COINS
          </button>
        ))}

        {/* custom coin box */}
        <button
          onClick={() => {
            if (customConfirmed && lastClicked === 'custom') {
              setCustomConfirmed(false);
              setCustomValue(selectedCoin?.toString() || '');
              setLastClicked('custom');
            } else {
              handleCustomClick();
            }
          }}
          className={`w-40 h-28 rounded-xl text-2xl font-bold shadow transition ${
            lastClicked === 'custom' && customConfirmed ? 'bg-gray-300' : 'bg-white'
          }`}
        >
          {customConfirmed && lastClicked === 'custom' && selectedCoin ? (
            <span className="text-green-600">
              {selectedCoin} <br /> COINS
            </span>
          ) : (
            <>CUSTOM</>
          )}
        </button>
      </div>

      {/* custom input popup */}
      {lastClicked === 'custom' && !customConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center space-y-4">
            <input
              type="number"
              inputMode="numeric"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Enter Amount"
              className="bg-white border-b-2 text-center text-xl outline-none py-2 w-full appearance-none 
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={handleConfirm}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow"
            >
              CONFIRM
            </button>
          </div>
        </div>
      )}
      {keyword == "deduct" && role == "renter" && (
        <button
          onClick={handleCashOut}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl text-xl font-semibold shadow"
        >
          Cash Out
        </button>
      )}
      {keyword == "add" && role == "user" && (
        <button
          onClick={handleAddCoins}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-xl font-semibold shadow"
        >
          ADD COINS
        </button>
        
      )}

      { deductComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-3xl shadow-lg text-center py-12 w-80">
            <Image
              src={'/img/true.png'}
              alt="Status Icon"
              width={120}
              height={120}
              className="mx-auto pb-5"
            />
            <h2 className="text-3xl font-bold text-black pb-1">
              Cash Out Complete
            </h2>
            <p className="text-gray-600">Redirecting in {redirectCountdown} secs...</p>
          </div>
        </div>
      )}
      
    </div>
  );
}

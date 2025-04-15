'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CoinPage() {
  const router = useRouter();
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

  // coin options
  const coinOptions = [100, 200, 300, 400, 500];

  // handle coin box click
  const handleCoinSelect = (coin: number) => {
    setSelectedCoin(coin);
    setShowCustomInput(false);
  };

  // handle custom box click
  const handleCustomClick = () => {
    setSelectedCoin(null);
    setShowCustomInput(true);
  };

  // handle custom input confirm
  const handleConfirm = () => {
    const value = parseInt(customValue);
    if (isNaN(value) || value < 100) {
      alert('Please enter at least 100 coins');
      return;
    }
    setSelectedCoin(value);
    setShowCustomInput(false);
  };

  // handle add coins button click
  const handleAddCoins = () => {
    if (selectedCoin === null) {
      alert('Please select a coin amount');
      return;
    }

    const currentBalance = 500; // ** replace with real user coin balance **

    if (selectedCoin > currentBalance) {
      alert('Not enough balance');
    } else {
      router.push('/wallet/qr'); // redirect to QR page
    }
  };

  return (
    <div className="min-h-screen text-black bg-[#FFD8A3] flex flex-col items-center justify-center space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {coinOptions.map((coin) => (
          <button
            key={coin}
            onClick={() => handleCoinSelect(coin)}
            className={`w-32 h-24 rounded-xl text-2xl font-bold shadow transition ${
              selectedCoin === coin ? 'bg-gray-300' : 'bg-white'
            }`}
          >
            {coin} <br /> COINS
          </button>
        ))}
        <button
          onClick={handleCustomClick}
          className={`w-32 h-24 rounded-xl text-2xl font-bold shadow transition ${
            showCustomInput ? 'bg-gray-300' : 'bg-white'
          }`}
        >
          CUSTOM
        </button>
      </div>

      {showCustomInput && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center space-y-4">
            <input
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Enter Amount"
              className="bg-white border-b-2 text-center text-xl outline-none py-2 w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

      <button
        onClick={handleAddCoins}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-xl font-semibold shadow"
      >
        ADD COINS
      </button>
    </div>
  );
}

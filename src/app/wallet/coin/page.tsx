'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CoinPage() {
  const router = useRouter();
  const [selectedCoin, setSelectedCoin] = useState<number | null>(null);
  const [customValue, setCustomValue] = useState('');
  const [customConfirmed, setCustomConfirmed] = useState(false);
  const [lastClicked, setLastClicked] = useState<'preset' | 'custom' | null>(null);

  // coin options
  const coinOptions = [100, 200, 300, 400, 500];

  // handle coin box click
  const handleCoinSelect = (coin: number) => {
    setSelectedCoin(coin);
    setCustomConfirmed(false);
    setLastClicked('preset');
  };

  // handle custom box click
  const handleCustomClick = () => {
    setCustomValue('');
    setCustomConfirmed(false);
    setLastClicked('custom');
  };

  // handle custom input confirm
  const handleConfirm = () => {
    const value = parseInt(customValue);
    if (isNaN(value) || value < 100) {
      alert('Please enter at least 100 coins');
      return;
    }
    setSelectedCoin(value);
    setCustomConfirmed(true);
    setLastClicked('custom');
  };

  // handle add coins button click
  const handleAddCoins = () => {
    if (selectedCoin === null) {
      alert('Please select a coin amount');
      return;
    }

    const currentBalance = 99999; // ** will replace with real user coin balance **

    if (selectedCoin > currentBalance) {
      alert('Not enough balance');
    } else {
      localStorage.setItem('selectedCoin', selectedCoin.toString());
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
              // re-edit if already confirmed and last clicked was custom
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

      <button
        onClick={handleAddCoins}
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-xl font-semibold shadow"
      >
        ADD COINS
      </button>
    </div>
  );
}
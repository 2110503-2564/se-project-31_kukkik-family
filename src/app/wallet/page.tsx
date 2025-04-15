'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import { getCoin } from '@/libs/getCoin'

export default function WalletPage() {
  const [coins, setCoins] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCoins = async () => {
      // MOCK DATA
      const mockCoin = 99999
      setCoins(mockCoin)

      // API
      /*
      const token = localStorage.getItem('token') || ''
      const userId = localStorage.getItem('userId') || ''
      const coinAmount = await getCoin(token, userId)
      setCoins(coinAmount)
      */
    }

    fetchCoins()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black bg-orange-50 px-2 py-2">
      {/* Box showing coin count */}
      <div className="bg-white rounded-3xl shadow-md px-16 py-14 mb-10 text-center">
        <h1 className="text-7xl font-bold">
          {coins !== null ? coins.toLocaleString() : 'Loading...'}
        </h1>
        <p className="text-2xl mt-2">COINS</p>
      </div>

      {/* Button to go to top-up page */}
      <button
        onClick={() => router.push('/wallet/topup')}
        className="flex flex-col items-center transition-transform duration-200"
      >
        <div className="rounded-full shadow-lg overflow-hidden w-24 h-24">
          <Image
            src="/img/addcoin.png"
            alt="Add Coins"
            width={96}
            height={96}
            className="object-cover transition duration-200 hover:brightness-90"
          />
        </div>
        <p className="font-bold mt-3">ADD COINS</p>
      </button>
    </div>
  )
}

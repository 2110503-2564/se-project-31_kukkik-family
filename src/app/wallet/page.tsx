'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function WalletPage() {
  const [coins, setCoins] = useState<number | null>(null)
  const router = useRouter()

  const { data: session, status } = useSession() 
  const role = session?.user?.role // user role

  useEffect(() => {
    if (status === 'unauthenticated') {
      // not login -> redirect to login page
      router.push('/login')
      return
    }

    if (status === 'authenticated') {
      // Mock
      const mockCoin = 99999
      setCoins(mockCoin)

      // API
      /*
      const token = session?.user?.token || ''
      const userId = session?.user?.id || ''
      const coinAmount = await getCoin(token, userId)
      setCoins(coinAmount)
      */
    }
  }, [status, router, session])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black bg-[#FFD8A3] px-2 py-2">
      {/* coin */}
      <div className="bg-white rounded-3xl shadow-md px-16 py-14 mb-10 text-center">
        <h1 className="text-7xl font-bold">
          {coins !== null ? coins.toLocaleString() : 'Loading...'}
        </h1>
        <p className="text-2xl mt-2">COINS</p>
      </div>

      {/* user (borrower) */}
      {role === 'user' && (
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
      )}

      {/* renter */}
      {role === 'renter' && (
        <button
          onClick={() => router.push('/wallet/cashout')}
          className="flex flex-col items-center transition-transform duration-200"
        >
          <div className="rounded-full shadow-lg overflow-hidden w-24 h-24">
            <Image
              src="/img/cashout.png"
              alt="Cash Out"
              width={96}
              height={96}
              className="object-cover transition duration-200 hover:brightness-90"
            />
          </div>
          <p className="font-bold mt-3">CASH OUT</p>
        </button>
      )}

      {/* admin */}
      {role === 'admin' && (
        <div className="flex flex-row gap-12">
          {/* add coin button */}
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
          {/* cash out button */}
          <button
            onClick={() => router.push('/wallet/cashout')}
            className="flex flex-col items-center transition-transform duration-200"
          >
            <div className="rounded-full shadow-lg overflow-hidden w-24 h-24">
              <Image
                src="/img/cashout.png"
                alt="Cash Out"
                width={96}
                height={96}
                className="object-cover transition duration-200 hover:brightness-90"
              />
            </div>
            <p className="font-bold mt-3">CASH OUT</p>
          </button>
        </div>
      )}

      {/*
      {// admin manage wallet user//}
      {role === 'admin' && (
        <button
          onClick={() => router.push('/admin/wallet')}
          className="flex flex-col items-center transition-transform duration-200"
        >
          <div className="rounded-full shadow-lg overflow-hidden w-24 h-24 bg-gray-300 flex items-center justify-center text-xl font-bold">
            ADMIN
          </div>
          <p className="font-bold mt-3">MANAGE WALLETS</p>
        </button>
      )}
      */}
    </div>
  )
}

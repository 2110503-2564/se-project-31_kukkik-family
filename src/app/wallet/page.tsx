'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { getCoins } from '@/libs/getCoins'

export default function WalletPage() {
  const [coins, setCoins] = useState<number | null>(null)
  const router = useRouter()

  const { data: session, status } = useSession() 
  const role = session?.user?.role // get role from session
  const token = session?.user?.token || '' // get token from session

  const routeAddCoins = () => {
    router.push('/wallet/coin?keyword=add');
  };

  const routeDeductCoins = () => {
    router.push('/wallet/coin?keyword=deduct');
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      // not login -> redirect to login page
      router.push('/login')
      return
    }

    if (status === 'authenticated') {
      // call backend to get user coin
      const fetchCoins = async () => {
        try {
          const res = await getCoins(token)
          if (res && res.coin !== undefined) {
            setCoins(res.coin)
          } else {
            console.error('No coin data found')
            setCoins(0)
          }
        } catch (err) {
          console.error('Failed to fetch coins:', err)
          setCoins(0)
        }
      }

      fetchCoins()
    }
  }, [status, router, session])

  // loading session
  if (status === 'loading' || status === 'unauthenticated') return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black bg-[#FFD8A3] px-2 py-2">
      {/* coin */}
      {/* show coin for user or manage for admin */}
      <div className="bg-white rounded-3xl shadow-md w-[500px] px-20 py-20 mb-10 text-center">
        {role === 'admin' ? (
          <>
            <h1 className="text-6xl font-bold">Manage</h1>
            <p className="text-xl mt-2">COINS</p>
          </>
        ) : (
          <>
            <h1 className="text-7xl font-bold" id="userCoin">
              {coins !== null ? coins.toLocaleString() : 'Loading...'}
            </h1>
            <p className="text-2xl mt-2">COINS</p>
          </>
        )}
      </div>

      {/* user (borrower)  onClick={() => router.push('/wallet/coin')} */}
      {role === 'user' && (
        <button
          onClick={routeAddCoins}
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

      {/* renter () => router.push('/wallet/coin') */}
      {role === 'renter' && (
        <button
          onClick={routeDeductCoins}
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

      {/* admin () => router.push('/wallet/coin')*/}
      {role === 'admin' && (
        <div className="flex flex-row gap-12">
          {/* add coin button */}
          <button
            onClick={routeAddCoins}
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
          {/* cash out button () => router.push('/wallet/coin')*/}
          <button
            onClick={routeDeductCoins}
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

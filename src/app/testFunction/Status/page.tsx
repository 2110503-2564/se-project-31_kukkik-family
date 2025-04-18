'use client'
import { useState } from 'react';

export default function PayErrorStatus() {
    const [status, setStatus] = useState<boolean | null>(null);
    const [quit, setQuit] = useState<boolean | null>(true);

    return (
        <div className='bg-white'>
            <button onClick={() => {setStatus(true); setQuit(true);}} className='text-black m-4 bg-gray-200'>Set Success</button>
            <button onClick={() => {setStatus(false); setQuit(true);}} className='text-black m-4 bg-gray-300'>Set Failure</button>
            <button onClick={() => {setStatus(null); setQuit(true);}} className='text-black m-4 bg-gray-400'>Reset</button>

            {quit && status === null && <div className='text-black'>transition not complete yet...</div>}
            {quit && status === true && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={() => setQuit(false)}>
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 m-3 flex flex-col items-center space-y-4">
                        <div className="bg-green-100 rounded-full p-6 flex items-center justify-center">
                            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Transaction Complete</h1>
                        <p className="text-gray-600 text-center">Your payment was successful. Thank you!</p>
                    </div>
                </div>
            
            )}
            {quit && status === false && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={() => setQuit(false)}>
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 m-3 flex flex-col items-center space-y-4">
                        <div className="bg-red-100 rounded-full p-6 flex items-center justify-center">
                            <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Transaction Failed</h1>
                        <p className="text-gray-600 text-center">Unfortunately, your payment could not be processed.</p>
                    </div>
                </div>
            
            )}
        </div>
    );
}

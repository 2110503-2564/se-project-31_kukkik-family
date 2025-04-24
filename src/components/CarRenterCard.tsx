import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';

import { Snackbar, Alert } from '@mui/material';

export default function CarRenterCard({carId, carName, imgSrc, price, seat, like, province}
                            :{carId:string, carName:string, imgSrc:string, price:number, seat:number, like:number, province:string}) {

    const { data: session } = useSession();
    const token = session?.user?.token;

    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');

    
    return (
        <>
        <InteractiveCard>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image 
                    src={imgSrc}
                    alt={carName}
                    fill={true}
                    className='object-cover rounded-t-lg'
                />
            </div>
            <div className='w-full h-[30%] p-2 text-center text-lg font-semibold text-black flex flex-col justify-center items-center'>
                <div>{carName}</div>
                <div className='flex flex-row items-center gap-x-4'>
                    <p className="text-sm text-gray-400">{seat} seats</p>
                    <p className="text-sm text-gray-400">{province}</p>
                </div>
                
                <div className="flex justify-between w-full items-center">
                <p className="text-base font-medium">${price}</p>
                
                </div>
            </div>
        </InteractiveCard>

        {/* Snackbar for friendly alert messages */}
      <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </>
    );
}
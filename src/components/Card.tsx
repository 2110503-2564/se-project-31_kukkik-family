import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import {useState, useEffect} from 'react';
import {AiOutlineHeart} from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import likeCar from '@/libs/likeCar';
import { Snackbar, Alert } from '@mui/material';
import Link from "next/link";
export default function Card({carId, carName, imgSrc, price, seat, like, province, renter}
                            :{carId:string, carName:string, imgSrc:string, price:number, seat:number, like:number, province:string, renter:string}) {

    const { data: session } = useSession();
    const token = session?.user?.token;

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(like);

    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');

    const handleLike = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
    
        if (!token) {
          setSnackbarMessage('Please log in to like the car');
          setSnackbarSeverity('warning');
          setOpenSnackbar(true);
          return;
        }
    
        if (isLiked) {
          // Show a Snackbar if the user tries to like again
          setSnackbarMessage('You already liked this car');
          setSnackbarSeverity('info');
          setOpenSnackbar(true);
          return;
        }
    
        try {
          await likeCar(carId, token);
          setIsLiked(true);
          setLikeCount(prev => prev + 1);
          setSnackbarMessage('Car liked successfully');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        } catch (error: unknown) {
          console.error("Error liking car:", error);
          if (error instanceof Error && error.message === 'You have already liked this car') {
            setSnackbarMessage('You already liked this car');
            setSnackbarSeverity('info');
          } else {
            setSnackbarMessage('Failed to like the car');
            setSnackbarSeverity('error');
          }
          setOpenSnackbar(true);
        }
      };

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
                    <p className="text-sm text-gray-500">{seat} seats</p>
                    <p className="text-sm text-gray-500">{province}</p>
                    <div onClick={(e) => { e.stopPropagation(); handleLike(e); }} className="text-2xl flex flex-row items-center">
                        <p className="text-sm text-gray-500 mr-2">{likeCount}</p>
                        <AiOutlineHeart
                        className={`${isLiked ? "text-red-500" : "text-gray-500"}`}
                        />
                    </div>
                </div>
                
                <div className="flex justify-between w-full items-center">
                <Link href={`/renters/${renter}`} prefetch={true}>
                  <button>
                    <p className="text-sm text-blue-500">View renter</p>
                  </button>
                </Link>
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
// components/RenterCard.tsx
import React from 'react';

const RenterCard: React.FC<RenterCardProps> = ({
  name,
  tel,
  email,
  selfiePicture,
  idCardPicture,
  onApprove,
  onDeny,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-80 text-center">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p><strong>tel.</strong> : {tel}</p>
      <p className="mb-4"><strong>email</strong> : {email}</p>

      <div className="flex justify-center gap-4 mb-4">
        <div>
          <img
            src={selfiePicture || 'https://via.placeholder.com/80'}
            alt="Selfie"
            className="w-20 h-20 rounded bg-gray-200 object-cover mx-auto"
          />
          <p className="font-semibold mt-1">SELFIE</p>
        </div>
        <div>
          <img
            src={idCardPicture || 'https://via.placeholder.com/80'}
            alt="ID Card"
            className="w-20 h-20 rounded bg-gray-200 object-cover mx-auto"
          />
          <p className="font-semibold mt-1">ID CARD</p>
        </div>
      </div>

       <div className="flex justify-center gap-4">
        <button
          onClick={onDeny}
          className="bg-red-600 text-white px-4 py-2 rounded-full shadow"
        >
          DENY
        </button>
        <button
          onClick={onApprove}
          className="bg-green-600 text-white px-4 py-2 rounded-full shadow"
        >
          APPROVE
        </button>
      </div> 
    </div>
  );
};

export default RenterCard;

interface CarProvider {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    picture: string;
    like: number;
    dailyrate: number;
    __v: number;
    seat: number;
    booking: BookingData[];
    id: string;
  }
  
  interface CarProviderJson {
    success: boolean;
    count: number;
    pagination: Object;
    data: CarProvider[];
  }
  
  interface BookingData {
    _id: string;
    startDate: string;
    endDate: string;
    user: string;
    carProvider: CarProvider;
    createdAt: string;
    __v: number;
    status: 'rented' | 'received' | 'returned';
  }
  
  interface BookingResponse {
    success: boolean;
    count: number;
    data: BookingData[];
  }

  interface User {
    _id: string;
    name: string;
    tel: string;
    email: string;
  }

  interface UserJson {
    success: boolean;
    count: number;
    data: User[];
  }
  
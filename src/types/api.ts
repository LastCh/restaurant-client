export interface User {
  id: number;
  clientId: number | null; 
  username: string;
  fullName: string;
  phone: string;
  role: 'ADMIN' | 'CLIENT' | 'MANAGER' | 'WAITER';
  enabled: boolean;
}

export interface SignUpRequest {
  username: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  userId: number;
  clientId: number;
  username: string;
  role: string;
  expiresIn: number;
}

export interface DishDTO {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  isAvailable: boolean;
  imageUrl?: string;
  preparationTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReservationDTO {
  reservationTime: string;
  durationMinutes?: number;
  partySize: number;
  clientId: number;
  tableId: number;
  notes?: string;
}


export interface ReservationDTO {
  id?: number;
  clientId?: number; 
  tableId: number;
  reservationTime: string;
  numberOfGuests?: number;
  partySize?: number;
  durationMinutes?: number;
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  specialRequests?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}





export interface TableDTO {
  id: number;
  number: number;
  capacity: number;
  location: string;
  available: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ErrorResponse {
  message: string;
}


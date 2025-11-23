export interface User {
  id: number;
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
  username: string;
  role: string;
  expiresIn: number;
}

export interface DishDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReservationDTO {
  id?: number;
  clientId: number;
  tableId: number;
  reservationTime: string;
  // Для совместимости поддерживаем оба имени: backend ожидает `partySize`.
  numberOfGuests?: number;
  partySize?: number;
  // Длительность бронирования в минутах (backend требует `durationMinutes`)
  durationMinutes?: number;
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  // Текст заметок/пожеланий: backend использует `notes` в примерах.
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


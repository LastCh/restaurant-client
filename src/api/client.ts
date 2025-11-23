import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  SignUpRequest,
  SignInRequest,
  JwtResponse,
  DishDTO,
  ReservationDTO,
  PageResponse,
} from '@/types/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Добавляем токен к каждому запросу
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Обрабатываем ошибки авторизации
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async signUp(data: SignUpRequest): Promise<{ message: string }> {
    const response = await this.client.post('/auth/signup', data);
    return response.data;
  }

  async signIn(data: SignInRequest): Promise<JwtResponse> {
    const response = await this.client.post('/auth/signin', data);
    const jwtResponse = response.data;
    // Сохраняем токены
    localStorage.setItem('accessToken', jwtResponse.accessToken);
    localStorage.setItem('refreshToken', jwtResponse.refreshToken);
    localStorage.setItem('user', JSON.stringify({
      id: jwtResponse.userId,
      username: jwtResponse.username,
      role: jwtResponse.role,
    }));
    return jwtResponse;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await this.client.post('/auth/refresh', { refreshToken });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  }

  // Dishes endpoints
  async getDishes(
    page: number = 0,
    size: number = 100,
    sortBy: string = 'createdAt',
    direction: string = 'desc'
  ): Promise<PageResponse<DishDTO>> {
    const response = await this.client.get('/dishes', {
      params: { page, size, sortBy, direction },
    });
    return response.data;
  }

  async getDishById(id: number): Promise<DishDTO> {
    const response = await this.client.get(`/dishes/${id}`);
    return response.data;
  }

  async getAvailableDishes(
    page: number = 0,
    size: number = 100
  ): Promise<PageResponse<DishDTO>> {
    const response = await this.client.get('/dishes/available', {
      params: { page, size },
    });
    return response.data;
  }

  async getDishesByCategory(
    category: string,
    page: number = 0,
    size: number = 100
  ): Promise<PageResponse<DishDTO>> {
    const response = await this.client.get(`/dishes/category/${category}`, {
      params: { page, size },
    });
    return response.data;
  }

  // Reservations endpoints
  async createReservation(data: ReservationDTO): Promise<ReservationDTO> {
    const response = await this.client.post('/reservations', data);
    return response.data;
  }

  async getReservationsByClient(
    clientId: number,
    page: number = 0,
    size: number = 10
  ): Promise<PageResponse<ReservationDTO>> {
    const response = await this.client.get(`/reservations/client/${clientId}`, {
      params: { page, size },
    });
    return response.data;
  }

  async getReservationById(id: number): Promise<ReservationDTO> {
    const response = await this.client.get(`/reservations/${id}`);
    return response.data;
  }

  async getAvailableSlots(
    tableId: number,
    startTime: string,
    endTime: string
  ): Promise<ReservationDTO[]> {
    const response = await this.client.get('/reservations/available', {
      params: { tableId, startTime, endTime },
    });
    return response.data;
  }

  async updateReservation(
    id: number,
    data: ReservationDTO
  ): Promise<ReservationDTO> {
    const response = await this.client.put(`/reservations/${id}`, data);
    return response.data;
  }

  async cancelReservation(id: number): Promise<void> {
    await this.client.put(`/reservations/${id}/cancel`);
  }
}

export const apiClient = new ApiClient();


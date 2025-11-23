import { create } from 'zustand';
import { apiClient } from '@/api/client';
import type { ReservationDTO, PageResponse } from '@/types/api';

interface ReservationState {
  reservations: ReservationDTO[];
  isLoading: boolean;
  error: string | null;
  createReservation: (data: ReservationDTO) => Promise<ReservationDTO>;
  fetchReservationsByClient: (clientId: number) => Promise<void>;
  getAvailableSlots: (
    tableId: number,
    startTime: string,
    endTime: string
  ) => Promise<ReservationDTO[]>;
}

export const useReservationStore = create<ReservationState>((set) => ({
  reservations: [],
  isLoading: false,
  error: null,

  createReservation: async (data: ReservationDTO) => {
    set({ isLoading: true, error: null });
    try {
      const reservation = await apiClient.createReservation(data);
      set({ isLoading: false });
      return reservation;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ошибка создания бронирования',
        isLoading: false,
      });
      throw error;
    }
  },

  fetchReservationsByClient: async (clientId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response: PageResponse<ReservationDTO> =
        await apiClient.getReservationsByClient(clientId);
      set({
        reservations: response.content,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ошибка загрузки бронирований',
        isLoading: false,
      });
    }
  },

  getAvailableSlots: async (
    tableId: number,
    startTime: string,
    endTime: string
  ) => {
    set({ isLoading: true, error: null });
    try {
      const slots = await apiClient.getAvailableSlots(tableId, startTime, endTime);
      set({ isLoading: false });
      return slots;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ошибка загрузки доступных слотов',
        isLoading: false,
      });
      throw error;
    }
  },
}));


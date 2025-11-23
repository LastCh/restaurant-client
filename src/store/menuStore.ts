import { create } from 'zustand';
import { apiClient } from '@/api/client';
import type { DishDTO, PageResponse } from '@/types/api';

interface MenuState {
  dishes: DishDTO[];
  categories: string[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
  fetchDishes: () => Promise<void>;
  fetchDishesByCategory: (category: string) => Promise<void>;
  fetchAvailableDishes: () => Promise<void>;
  setSelectedCategory: (category: string | null) => void;
}

export const useMenuStore = create<MenuState>((set, get) => ({
  dishes: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,

  fetchDishes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: PageResponse<DishDTO> = await apiClient.getDishes(0, 1000);
      const dishes = response.content;
      const categories = Array.from(new Set(dishes.map((d) => d.category)));
      set({
        dishes,
        categories,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ошибка загрузки меню',
        isLoading: false,
      });
    }
  },

  fetchDishesByCategory: async (category: string) => {
    set({ isLoading: true, error: null, selectedCategory: category });
    try {
      const response: PageResponse<DishDTO> = await apiClient.getDishesByCategory(
        category,
        0,
        1000
      );
      set({
        dishes: response.content,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ошибка загрузки меню',
        isLoading: false,
      });
    }
  },

  fetchAvailableDishes: async () => {
    set({ isLoading: true, error: null });
    try {
      const response: PageResponse<DishDTO> = await apiClient.getAvailableDishes(0, 1000);
      const dishes = response.content;
      const categories = Array.from(new Set(dishes.map((d) => d.category)));
      set({
        dishes,
        categories,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ошибка загрузки меню',
        isLoading: false,
      });
    }
  },

  setSelectedCategory: (category: string | null) => {
    set({ selectedCategory: category });
  },
}));


import { create } from 'zustand';
import { apiClient } from '@/api/client';
import type { SignUpRequest, SignInRequest, JwtResponse } from '@/types/api';

interface User {
  id: number;
  clientId: number | null;
  username: string;
  role: string;
}


interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (data: SignUpRequest) => Promise<void>;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  signUp: async (data: SignUpRequest) => {
    set({ isLoading: true });
    try {
      await apiClient.signUp(data);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

    signIn: async (data: SignInRequest) => {
    set({ isLoading: true });
    try {
      const response: JwtResponse = await apiClient.signIn(data);

      const user = {
        id: response.userId,
        clientId: response.clientId,
        username: response.username,
        role: response.role,
      };

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },


  signOut: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  checkAuth: () => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (userStr && token) {
      try {
        const user = JSON.parse(userStr);
        set({
          user,
          isAuthenticated: true,
        });
      } catch {
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    } else {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));


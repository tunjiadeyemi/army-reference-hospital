
import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  initialized: boolean;
  setToken: (token: string | null) => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  initialized: false,
  setToken: (token) => set({ token }),
  initAuth: () => {
    const token = Cookies.get("token") || null;
    set({ token, initialized: true });
  },
}));
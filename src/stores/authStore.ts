import { User } from "@/models/user";
import { login, register } from "@/repo/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User, token?: string) => void;
  verifyToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: undefined,
      token: undefined,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          const result = await login({ email, password });

          if (result.user && result.token) {
            set({
              user: result.user,
              token: result.token,
              isAuthenticated: true,
            });

            localStorage.setItem("auth-token", result.token);

            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true });

        try {
          const result = await register({ name, email, password });

          if (result) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem("auth-token");
        set({
          user: undefined,
          token: undefined,
          isAuthenticated: false,
        });
      },

      setUser: (user: User, token?: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });

        if (token) {
          localStorage.setItem("auth-token", token);
        }
      },

      verifyToken: async () => {
        const state = get();
        const token = state.token || localStorage.getItem("auth-token");

        if (!token) {
          localStorage.removeItem("auth-token");
          set({
            user: undefined,
            token: undefined,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

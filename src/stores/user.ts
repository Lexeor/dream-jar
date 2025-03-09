import { create } from 'zustand';

interface UserStore {
  user: any; // You can define a better type if needed
  setUser: (user: any) => void; // Method to update the user data
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
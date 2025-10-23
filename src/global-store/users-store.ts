import { IUser } from '@/interfaces'
import { create } from 'zustand'

const usersGlobalStore = create((set) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),
}));

export default usersGlobalStore;

export interface IUsersGlobalStore {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}
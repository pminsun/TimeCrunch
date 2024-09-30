import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//// 유저정보 - 로컬 스토리지 저장(user) ////
export const useUserStore = create(
  persist(
    (set) => ({
      userEmail: '',
      setUserEmail: (value: string) => set({ userEmail: value }),
      accessToken: '',
      setAccessToken: (value: string) => set({ accessToken: value }),
      userAccessToken: '',
      setUserAccessToken: (value: string) => set({ userAccessToken: value }),
      clearUser: () => set({ userEmail: '', accessToken: '', userAccessToken: '' }),
    }),
    {
      name: 'user', // 로컬 스토리지 키
    },
  ),
);

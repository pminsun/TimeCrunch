import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//// 유저정보 - 로컬 스토리지 저장(user) ////
interface UserState {
  userEmail: string;
  setUserEmail: (value: string) => void;
  accessToken: string;
  setAccessToken: (value: string) => void;
  userAccessToken: string;
  setUserAccessToken: (value: string) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserState>(
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

//// 무드 선택 ////
interface MoodSettingState {
  mood: string;
  setMod: (value: string) => void;
  walkTime: number;
  setWalkTime: (value: number) => void;
  place: string[]; // place를 문자열 배열로 지정
  setPlace: (value: string[]) => void; // place를 설정하는 함수
  findPlace: boolean;
  setFindPlace: (value: boolean) => void;
}

export const useMoodSettingStore = create(
  persist<MoodSettingState>(
    (set) => ({
      mood: '',
      setMod: (value: string) => set({ mood: value }),
      walkTime: 0,
      setWalkTime: (value: number) => set({ walkTime: value }),
      place: [], // 문자열 배열로 초기화
      setPlace: (value: string[]) => set({ place: value }), // 문자열 배열을 받는 setPlace
      findPlace: true,
      setFindPlace: (value: boolean) => set({ findPlace: value }),
    }),
    {
      name: 'moodSetting', // 로컬 스토리지 키
    },
  ),
);

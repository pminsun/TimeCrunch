import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//// 유저정보 - 로컬 스토리지 저장(user) ////
interface UserState {
  userEmail: string;
  setUserEmail: (value: string) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userEmail: '',
      setUserEmail: (value: string) => set({ userEmail: value }),
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

interface TempMoodState {
  tempStoreMood: string;
  setTempStoreMood: (value: string) => void;
  tempStoreWalkTime: number;
  setTempStoreWalkTime: (value: number) => void;
  tempStorePlace: string[]; // place를 문자열 배열로 지정
  setTempStorPlace: (value: string[]) => void; // place를 설정하는 함수
}

export const useTempMoodStore = create(
  persist<TempMoodState>(
    (set) => ({
      tempStoreMood: '',
      setTempStoreMood: (value: string) => set({ tempStoreMood: value }),
      tempStoreWalkTime: 0,
      setTempStoreWalkTime: (value: number) => set({ tempStoreWalkTime: value }),
      tempStorePlace: [],
      setTempStorPlace: (value: string[]) => set({ tempStorePlace: value }),
    }),
    {
      name: 'tempmoodSetting', // 로컬 스토리지 키
    },
  ),
);

//// 좋아요 선택 ////
interface LikeState {
  likeList: string[];
  setLikeList: (value: string[]) => void;
}

export const useLikeStore = create<LikeState>((set) => ({
  likeList: [],
  setLikeList: (value: string[]) => set({ likeList: value }),
}));

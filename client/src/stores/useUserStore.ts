import { create } from 'zustand';

interface UserStoreState {
  userId: string;
  isLoggedIn: boolean;
  setUserId: (userId: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

// 세션 구현 이전 로그인 상태를 임시로 클라이언트에서 관리
const useUserStore = create<UserStoreState>((set) => ({
  userId: '',
  isLoggedIn: false,
  setUserId: (userId: string) => set(() => ({ userId })),
  setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
}));

export default useUserStore;

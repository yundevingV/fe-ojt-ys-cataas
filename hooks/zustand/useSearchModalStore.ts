import create from 'zustand';

interface useSearchModalStoreState {
  openSearchModal: boolean;
  setSearchModal: (isOpen: boolean) => void;
}

export const useSearchModalStore = create<useSearchModalStoreState>((set) => ({
  openSearchModal: false, // 초기 상태
  setSearchModal: (isOpen) => set({ openSearchModal: isOpen }), // 모달 열림/닫힘 상태 설정
}));
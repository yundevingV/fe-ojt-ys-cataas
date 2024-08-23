import create from 'zustand';

interface SelectedTagsStoreProps {
  selectedTags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void; // 새 메서드 추가
}

export const useSelectedTagsStore = create<SelectedTagsStoreProps>((set) => ({
  selectedTags: [],
  addTag: (tag) => set((state) => {
    if (!state.selectedTags.includes(tag)) {
      return { selectedTags: [...state.selectedTags, tag] };
    }
    return state;
  }),
  removeTag: (tag) => set((state) => ({
    selectedTags: state.selectedTags.filter(t => t !== tag),
  })),
  clearTags: () => set({ selectedTags: [] }), // 모든 태그를 지우는 메서드

}));

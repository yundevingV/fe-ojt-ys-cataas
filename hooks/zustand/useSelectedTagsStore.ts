import create from 'zustand';

interface SelectedTagsStoreProps {
  selectedTags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
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
  clearTags: () => set({ selectedTags: [] })

}));

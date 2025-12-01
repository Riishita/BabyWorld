import { create } from "zustand";

interface SearchStore {
  term: string;
  setTerm: (value: string) => void;
  clear: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  term: "",
  setTerm: (value) => set({ term: value }),
  clear: () => set({ term: "" }),
}));


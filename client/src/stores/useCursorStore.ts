import { create } from 'zustand';

interface CursorState {
  blockOffset: number;
  textOffset: number;
  setBlockOffset: (blockOffset: number) => void;
  setTextOffset: (textOffset: number) => void;
}
export const useCursorStore = create<CursorState>((set) => ({
  blockOffset: 0,
  textOffset: 0,
  setBlockOffset: (blockOffset: number) => set({ blockOffset }),
  setTextOffset: (textOffset: number) => set({ textOffset }),
}));

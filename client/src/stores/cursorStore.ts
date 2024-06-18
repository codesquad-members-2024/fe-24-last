import { create } from 'zustand';
import { CursorPosition } from '../helpers/cursorHelpers';

interface CursorState {
  cursorPosition: CursorPosition;
  setCursorPosition: (position: Partial<CursorPosition>) => void;
  increaseBlockOffset: () => void;
}
export const useCursorStore = create<CursorState>((set) => ({
  cursorPosition: {
    node: null,
    offset: 0,
    blockOffset: 0,
    range: null,
  },
  setCursorPosition: (position) =>
    set((prevState) => ({
      cursorPosition: {
        ...prevState.cursorPosition,
        ...position,
      },
    })),
  increaseBlockOffset: () =>
    set((prevState) => ({
      cursorPosition: {
        ...prevState.cursorPosition,
        ...{ blockOffset: prevState.cursorPosition.blockOffset + 1 },
      },
    })),
}));

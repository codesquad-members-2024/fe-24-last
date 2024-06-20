export interface CursorPosition {
  node: Node | null;
  offset: number;
  blockOffset: number;
  range: Range | null;
}

export const generateRange = () => {
  const selection = window.getSelection();
  const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

  return range;
};

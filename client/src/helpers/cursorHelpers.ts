interface SpecifyPositionOfCursorProps {
  cursorPosition: CursorPosition;
  isFocusedBlock: boolean;
}

export interface CursorPosition {
  node: Node | null;
  offset: number;
  blockOffset: number;
  range: Range | null;
}

export const specifyPositionOfCursor = ({ cursorPosition, isFocusedBlock }: SpecifyPositionOfCursorProps) => {
  const nodeOfCursor = cursorPosition.node;
  const { range } = cursorPosition;
  if (!(isFocusedBlock && nodeOfCursor && range)) return;

  const selection = window.getSelection();
  // const range = document.createRange();
  const nodeLength = nodeOfCursor.textContent?.length || 0;
  const offset = Math.min(cursorPosition.offset, nodeLength);
  // cursorPosition.offset : 저장된 커서 위치
  range.setStart(nodeOfCursor, offset);
  range.setEnd(nodeOfCursor, offset);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

export const storeCursorPosition = () => {
  const selection = window.getSelection();
  const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

  if (!range) return { range, node: null, offset: 0 };

  return { range, node: range?.startContainer, offset: range?.startOffset };
};

// const cursorPosition: CursorPosition = {
//   node: null,
//   offset: 0,
//   blockOffset: 0,
//   range: 0,
// };
// cursorPosition.node = range.startContainer;
// cursorPosition.offset = range.startOffset;
// cursorPosition.blockOffset = blockIndex;

// return { range, cursorPosition };

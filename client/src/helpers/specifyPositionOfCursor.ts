interface SpecifyPositionOfCursorProps {
  cursorPositionRef: React.RefObject<{ node: Node | null; offset: number; blockOffset: number }>;
  isFocusedBlock: boolean;
}

export const specifyPositionOfCursor = ({ cursorPositionRef, isFocusedBlock }: SpecifyPositionOfCursorProps) => {
  const nodeOfCursor = cursorPositionRef?.current?.node;
  if (isFocusedBlock && nodeOfCursor) {
    const selection = window.getSelection();
    const range = document.createRange();
    const nodeLength = nodeOfCursor.textContent?.length || 0;
    const offset = Math.min(cursorPositionRef?.current?.offset, nodeLength);
    // cursorPosition.offset : 저장된 커서 위치
    range.setStart(nodeOfCursor, offset);
    range.setEnd(nodeOfCursor, offset);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};

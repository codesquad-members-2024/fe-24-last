export interface CaretPosition {
    startContainer: Node;
    startOffset: number;
    endContainer: Node;
    endOffset: number;
}

export type CaretPositionRef = React.MutableRefObject<CaretPosition | null>;

const restoreCaretPosition = (caretPositionRef: CaretPositionRef): void => {
    const caretPosition = caretPositionRef.current;
    if (caretPosition) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStart(caretPosition.startContainer, caretPosition.startOffset);
        range.setEnd(caretPosition.endContainer, caretPosition.endOffset);
        selection?.removeAllRanges();
        selection?.addRange(range);
    }
};

export default restoreCaretPosition;
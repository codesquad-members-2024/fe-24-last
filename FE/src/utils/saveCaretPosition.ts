interface CaretPosition {
    startContainer: Node;
    startOffset: number;
    endContainer: Node;
    endOffset: number;
}

type CaretPositionRef = React.MutableRefObject<CaretPosition | null>;

const saveCaretPosition = (caretPositionRef: CaretPositionRef): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        caretPositionRef.current = {
            startContainer: range.startContainer,
            startOffset: range.startOffset,
            endContainer: range.endContainer,
            endOffset: range.endOffset,
        };
    }
};

export default saveCaretPosition;

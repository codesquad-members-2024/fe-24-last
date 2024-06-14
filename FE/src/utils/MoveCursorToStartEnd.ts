const moveCursorToStartEnd = (element: HTMLElement, isStart: boolean) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(isStart);
    selection?.removeAllRanges();
    selection?.addRange(range);
};

export default moveCursorToStartEnd
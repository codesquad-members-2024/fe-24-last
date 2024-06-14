export function focusOnBlock(blockId: string) {
  const newBlockElement = document.getElementById(blockId);
  if (newBlockElement) {
    newBlockElement.focus();
    const range = document.createRange();
    range.selectNodeContents(newBlockElement);
    range.collapse(false);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}

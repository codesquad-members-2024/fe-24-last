export function focusOnElement(focusedElementId: string) {
  const checkExist = setInterval(() => {
    const newFocusedElement = document.getElementById(focusedElementId);
    if (newFocusedElement) {
      clearInterval(checkExist);
      newFocusedElement.focus();
      const range = document.createRange();
      range.selectNodeContents(newFocusedElement);
      range.collapse(false);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, 100);
}

// Set cursor inside of an element.
export const setCursorAtStartOfElement = (element: HTMLElement) => {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;

  const range = document.createRange();

  // Set cursor position to start of element
  range.setStart(element, 0);
  range.setEnd(element, 0);
  selection.removeAllRanges();
  selection.addRange(range);
};

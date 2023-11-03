// Set the cursor's position after an element by adding a zero-width space
export const setCursorAfterElement = (element: HTMLElement) => {
  const selection = window.getSelection();
  if (selection && element.parentNode) {
    // Create a zero-width space text node
    const zeroWidthSpace = document.createTextNode("\u200B");

    // If the element is the last child of its parent, append the zero-width space directly
    // after the element. Otherwise, insert it before the next sibling.
    if (element.nextSibling) {
      element.parentNode.insertBefore(zeroWidthSpace, element.nextSibling);
    } else {
      element.parentNode.appendChild(zeroWidthSpace);
    }

    // Create a range and set it to the position right after the zero-width space
    const range = document.createRange();
    range.setStartAfter(zeroWidthSpace);
    range.collapse(true);

    // Update the selection with the new range
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

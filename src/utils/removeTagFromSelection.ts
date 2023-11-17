import { HTMLTag } from "../types";

// Remove the given HTML tags from the selection
export const removeTagFromSelection = (tag: HTMLTag, className?: string) => {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;

  const range = selection.getRangeAt(0);
  const selectedContent = range.extractContents();

  const removeTag = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      // Check if the element matches the tag and, if className is defined, the class
      if (
        element.nodeName.toLowerCase() === tag.toLowerCase() &&
        (!className || element.classList.contains(className))
      ) {
        const parent = node.parentNode;
        while (node.firstChild) {
          parent?.insertBefore(node.firstChild, node);
        }
        parent?.removeChild(node);
      } else {
        // If it's not the tag or doesn't have the class, check its children
        node.childNodes.forEach(removeTag);
      }
    }
  };

  removeTag(selectedContent);
  range.insertNode(selectedContent);

  // Clean up the selection ranges.
  const lastNode = range.startContainer.nextSibling;
  if (lastNode) {
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(lastNode);
    newRange.collapse(true);
    selection.addRange(newRange);
  }
};

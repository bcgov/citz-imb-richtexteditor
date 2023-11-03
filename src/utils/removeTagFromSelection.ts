import { HTMLTag } from "../types";

// Remove the given HTML tags from the selection
export const removeTagFromSelection = (tag: HTMLTag) => {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;

  const range = selection.getRangeAt(0);
  // Extract the selected content.
  const selectedContent = range.extractContents();

  // Recursively remove the specified tag from a node and its children.
  const removeTag = (node: Node) => {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.nodeName.toLowerCase() === tag.toLowerCase()
    ) {
      // If the node is the tag we want to remove, unwrap it.
      const parent = node.parentNode;
      while (node.firstChild) {
        parent?.insertBefore(node.firstChild, node);
      }
      parent?.removeChild(node);
    } else {
      // If it's not the tag, check its children.
      node.childNodes.forEach(removeTag);
    }
  };

  // Start the recursive tag removal.
  removeTag(selectedContent);

  // Insert the cleaned content back into the range.
  range.insertNode(selectedContent);

  // After insertion, the selectedContent is a document fragment and it's empty (all children are removed)
  // The nextSibling of the range's startContainer should be the last node of the inserted content.
  const lastNode = range.startContainer.nextSibling;

  // Clean up the selection ranges.
  if (lastNode) {
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStartAfter(lastNode);
    newRange.collapse(true);
    selection.addRange(newRange);
  }
};

import { GetParentElementProps } from "../types";

// Returns the parent element of the cursor or null.
export const getParentElement = (
  props: GetParentElementProps
): HTMLElement | null => {
  const { contentRef, tag } = props;

  // Get the current selection from the window
  const selection: Selection | null = window.getSelection();
  if (!selection?.rangeCount) return null;

  // Get the node where the selection starts
  // (the cursor position or the start of the selection)
  let node: Node | null = selection.anchorNode;

  // Loop up through the DOM tree from the cursor position
  while (node && node !== contentRef.current) {
    // If the current node is an element node, return it
    if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement) {
      // Must match tag if param is specified
      if ((tag && node.nodeName === tag) || !tag) return node;
    }
    // Move up to the parent node
    node = node.parentNode;
  }

  // If the loop exits without finding an element node, return null
  // This means the cursor is directly inside the content container
  return null;
};

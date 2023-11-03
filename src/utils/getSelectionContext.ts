import { SelectionContext } from "../types";

// Obtain detailed information about the user's current text selection
// or the position of their text cursor within the web page
export const getSelectionContext = (): SelectionContext => {
  // Get the current selection from the window
  const selection = window.getSelection();
  if (!selection?.rangeCount)
    return { currentNode: null, selection: null, range: null };

  // A range represents a fragment of a document that can contain nodes.
  const range = selection.getRangeAt(0);

  return {
    currentNode: range.startContainer,
    selection,
    range,
  };
};

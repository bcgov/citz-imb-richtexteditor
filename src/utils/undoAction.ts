import { UndoActionProps } from "../types";

// Undo the last action taken
// Actions: type character, copy/paste, format
export const undoAction = (props: UndoActionProps) => {
  const { undoStack, setUndoStack, setContent } = props;

  if (undoStack.length <= 1) return;

  // Set content to the last saved state in undoStack before the current state
  const lastItemIndex = undoStack.length - 2;
  setContent(undoStack[lastItemIndex]);

  // Remove the current and previous state from undo stack
  undoStack.pop();
  undoStack.pop();
  setUndoStack(undoStack);
};

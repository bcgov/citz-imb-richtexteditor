import { HandleKeyDownProps } from "../types";
import { getParentElement } from "./getParentElement";
import { getSelectionContext } from "./getSelectionContext";
import { setCursorAtStartOfElement } from "./setCursorAtStartOfElement";

// Handle when a key is pressed.
export const handleKeyDown = (props: HandleKeyDownProps) => {
  const { contentRef, e, handleChange, undoAction } = props;

  const { selection, range, currentNode } = getSelectionContext();
  const parentElement = getParentElement({ contentRef });
  const parentLi = getParentElement({ contentRef, tag: "LI" });

  if (e.key === "Enter") {
    // Prevent the default behavior of the Enter key
    e.preventDefault();

    if (parentLi) {
      // If the current list item is empty, exit the list
      if (currentNode?.textContent?.trim() === "") {
        const ul = parentLi.parentNode;
        const newP = document.createElement("p");
        newP.appendChild(document.createElement("br"));
        ul?.parentNode?.insertBefore(newP, ul.nextSibling);
        ul?.removeChild(parentLi);

        if (!ul?.hasChildNodes()) {
          // Remove the list if there are no items left
          ul?.parentNode?.removeChild(ul);
        }

        setCursorAtStartOfElement(newP);
      } else {
        // If the current list item is not empty, create a new list item
        const newLi = document.createElement("li");
        newLi.appendChild(document.createElement("br"));
        parentLi.after(newLi);
        setCursorAtStartOfElement(newLi);
      }
    } else {
      // General case for non-list items
      if (selection.rangeCount > 0 && range.collapsed) {
        const caretPos = range.startOffset;
        const textNode = range.startContainer;

        if (textNode.nodeType === Node.TEXT_NODE) {
          // Split text at caret position and create a new paragraph
          const splitText = textNode.textContent.substring(caretPos);
          textNode.textContent = textNode.textContent.substring(0, caretPos);

          const newP = document.createElement("p");
          if (splitText.length > 0) {
            newP.textContent = splitText;
          } else {
            newP.appendChild(document.createElement("br"));
          }

          if (!parentElement) {
            // Insert newline when on first line and text doesnt have parent
            textNode.parentNode.insertBefore(newP, textNode.nextSibling);
          } else {
            // Insert newline after parent
            parentElement.after(newP);
          }

          setCursorAtStartOfElement(newP);
        } else {
          if (parentElement) {
            const newElement = document.createElement("p");
            newElement.appendChild(document.createElement("br"));
            textNode.parentNode.insertBefore(newElement, textNode.nextSibling);
            setCursorAtStartOfElement(newElement);
          }
        }
      }
    }
    // Update state
    handleChange();
  } else if (e.ctrlKey && e.key === "z") {
    // Handle undo action
    e.preventDefault();
    undoAction();
  }
};

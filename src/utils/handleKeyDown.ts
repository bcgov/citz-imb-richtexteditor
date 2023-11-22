import { HandleKeyDownProps } from "../types";
import { getParentElement } from "./getParentElement";
import { getSelectionContext } from "./getSelectionContext";
import { setCursorAtStartOfElement } from "./setCursorAtStartOfElement";

// Handle when a key is pressed.
export const handleKeyDown = (props: HandleKeyDownProps) => {
  const { contentRef, e, handleChange } = props;

  const { currentNode } = getSelectionContext();
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
      // For non-list items, insert a new paragraph
      const newP = document.createElement("p");
      const br = document.createElement("br");
      newP.appendChild(br);

      if (parentElement && parentElement.nextSibling) {
        // Insert the new paragraph after the parent element
        parentElement.parentNode?.insertBefore(newP, parentElement.nextSibling);
      } else {
        // If there is no parent element, append the new paragraph to the content editable div
        contentRef.current?.appendChild(newP);
      }
      setCursorAtStartOfElement(newP);
    }

    handleChange();
  }
};

import { ToggleHeaderStyleProps } from "../types";
import { getSelectionContext } from "./getSelectionContext";
import { setCursorAtStartOfElement } from "./setCursorAtStartOfElement";
import { toggleStyle } from "./toggleStyle";

// Function to toggle the header style
export const toggleHeaderStyle = (props: ToggleHeaderStyleProps) => {
  const { contentRef, size, handleChange } = props;

  const { currentNode, range } = getSelectionContext();
  const selectedText = range?.toString() ?? "";
  const currentElement =
    currentNode instanceof HTMLElement
      ? currentNode
      : currentNode?.parentElement;

  // Check if the current line is effectively empty or contains only a <br> or wrapped in <p>
  const isEmptyOrBr =
    !currentElement ||
    currentElement.innerHTML === "<br>" ||
    currentElement.outerHTML === "<p><br></p>";

  if (selectedText.trim() === "" && isEmptyOrBr) {
    // Clear the line and replace with a header containing a zero-width space
    const header = document.createElement(size);
    header.innerHTML = "\u200B"; // Zero-width space

    if (currentElement) {
      // If the current element is a P that contains only a BR, replace it entirely with the header
      if (currentElement.tagName === "P") {
        currentElement.replaceWith(header);
      } else {
        // For other cases, just clear the innerHTML and set it to the header
        currentElement.innerHTML = "";
        currentElement.appendChild(header);
      }
    } else if (contentRef.current) {
      // If there's no current element, append the header to the contentRef
      contentRef.current.appendChild(header);
    }

    // Set the cursor inside the new header element
    setCursorAtStartOfElement(header);
  } else if (selectedText.trim() === "") {
    // No selection and current line is not empty: insert a blank header at the end
    const header = document.createElement(size);
    header.innerHTML = "\u200B"; // Zero-width space
    contentRef.current?.appendChild(header);
    setCursorAtStartOfElement(header);
  } else {
    // There is selected text: toggle the header tag on the selection
    toggleStyle({ contentRef, handleChange, tag: size });
  }

  // Update content
  handleChange();
};

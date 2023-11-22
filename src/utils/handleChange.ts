import { HandleChangeProps } from "../types";
import { sanitizeContent } from "./sanitizeContent";

// Update content state.
export const handleChange = (props: HandleChangeProps) => {
  const { contentRef, content, setContent } = props;

  if (contentRef.current) {
    const selection = window.getSelection();
    // Node that contains the selection
    const selectionAnchorNode = selection?.anchorNode;

    // A NodeList of all child elements
    const elements = contentRef.current.querySelectorAll("*:not(br)");

    // Iterate over all elements and remove the ones that are empty and don't contain the selection
    elements.forEach((el) => {
      // Check if the element is empty or contains only whitespace or zero-width space characters
      if (
        (el.innerHTML.trim() === "" || el.textContent === "\u200B") &&
        !el.contains(selectionAnchorNode ?? null) && // Do not remove if it contains the selection
        !el.querySelector("br")
      ) {
        // If the element is empty, remove it
        el.parentNode?.removeChild(el);
      }
    });

    // Handle <br> at beginning of content after backspacing content
    if (content === "<br>")
      handleChange({ contentRef, content: "", setContent });

    const sanitizedContent = sanitizeContent(contentRef.current.innerHTML);
    setContent(sanitizedContent);
  }
};

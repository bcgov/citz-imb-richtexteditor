import { RemoveHeadersFromSelectionProps } from "../types";
import { getParentElement } from "./getParentElement";
import { getSelectionContext } from "./getSelectionContext";

// Replaces all headers in selection with p tags
export const removeHeadersFromSelection = (
  props: RemoveHeadersFromSelectionProps
) => {
  const { contentRef, handleChange } = props;

  const { range } = getSelectionContext();
  if (!range) return;

  // Get the common ancestor container of the selection range
  const commonAncestorContainer = range?.commonAncestorContainer;

  if (
    commonAncestorContainer &&
    commonAncestorContainer?.nodeType === Node.ELEMENT_NODE
  ) {
    // Get all header elements (h1, h2, h3, etc.) within the common ancestor container
    const headers = (commonAncestorContainer as Element).querySelectorAll(
      "h1, h2, h3, h4, h5, h6"
    );

    // Iterate over each header and replace it with a paragraph
    headers.forEach((header) => {
      // Check if the header is the only child of a paragraph
      if (
        header.parentNode.nodeName === "P" &&
        header.parentNode.childNodes.length >= 1
      ) {
        // Replace the entire paragraph with a new paragraph containing the header's content
        const newP = document.createElement("p");
        newP.innerHTML = header.innerHTML;
        header.parentNode.parentNode.replaceChild(newP, header.parentNode);
      } else {
        // If the header is not the only child of a paragraph, just replace the header with a paragraph
        const p = document.createElement("p");
        p.innerHTML = header.innerHTML;
        header.parentNode.replaceChild(p, header);
      }
    });
  } else {
    // Single line selection where parent element is header
    const parentElement = getParentElement({ contentRef });
    if (["H1", "H2", "H3"].includes(parentElement?.nodeName)) {
      const rangeContents = range.extractContents();
      parentElement.replaceWith(rangeContents);
    }
  }

  // Update content after replacing headers
  handleChange();
};

import { ToggleStyleProps } from "../types";
import { getParentElement } from "./getParentElement";
import { getSelectionContext } from "./getSelectionContext";
import { removeTagFromSelection } from "./removeTagFromSelection";
import { setCursorAfterElement } from "./setCursorAfterElement";

export const toggleStyle = (props: ToggleStyleProps) => {
  const { contentRef, handleChange, tag, className, options } = props;

  const { selection, range } = getSelectionContext();
  const styledParentElement = getParentElement({
    contentRef,
    tag,
    className,
  });
  const selectedText = range?.toString() ?? "";

  if (selectedText.trim() === "") {
    // Selected text is empty.
    if (styledParentElement !== null) {
      // Move cursor just outside of style element
      setCursorAfterElement(styledParentElement);
    } else {
      if (tag === "A") {
        // Inserting links
        if (
          options?.link?.url === "" ||
          options?.link?.linkText === "" ||
          !options?.link?.selectionContext
        )
          return;

        const element = document.createElement("A") as HTMLAnchorElement;
        const textNode = document.createTextNode(options.link.linkText);
        element.appendChild(textNode);

        // Set the href and target attributes
        element.href = options.link.url;
        element.target = "_blank"; // Opens in new tab.

        // Add class names if provided
        if (className) element.className = className;

        // Replace range and selection because of inputs in link insert button
        const range = options.link.selectionContext?.range;
        const selection = options.link.selectionContext?.selection;

        if (range) {
          range.insertNode(element);
          range.setStart(textNode, 1);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
          setCursorAfterElement(element);
        }

        // Update content
        handleChange();
      } else {
        // Add style
        const element = document.createElement(tag);
        const textNode = document.createTextNode("\u200B"); // Zero-width space
        element.appendChild(textNode);

        // Add class names if provided
        if (className) element.className = className;

        if (range) {
          range.insertNode(element);
          range.setStart(textNode, 1);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
    }
  } else {
    // There is selected text.
    if (styledParentElement !== null) {
      // If the selected text is already styled, unwrap it
      while (styledParentElement.firstChild) {
        styledParentElement.parentNode?.insertBefore(
          styledParentElement.firstChild,
          styledParentElement
        );
      }
      styledParentElement.parentNode?.removeChild(styledParentElement);
    } else {
      // If the selected text is not styled, style it

      // Remove any instances of the tag from within the selection
      removeTagFromSelection(tag, className);

      const element = document.createElement(tag);

      // Add class names if provided
      if (className) element.className = className;

      if (range) {
        element.appendChild(range?.extractContents());
        range?.insertNode(element);
      }

      // Remove any parent header sizes
      if (
        tag.startsWith("H") &&
        ["H1", "H2", "H3"].includes(getParentElement({ contentRef })?.nodeName)
      ) {
        getParentElement({ contentRef }).replaceWith(element);
        range.setEndAfter(element);
      }
    }

    // Update content
    handleChange();

    // Remove selection
    if (range) {
      range?.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  // Maintain focus.
  contentRef.current?.focus();
};

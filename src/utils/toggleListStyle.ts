import { ToggleListStyleProps } from "../types";
import { getParentElement } from "./getParentElement";
import { getSelectionContext } from "./getSelectionContext";
import { setCursorAtStartOfElement } from "./setCursorAtStartOfElement";

// Function to toggle the list style
export const toggleListStyle = (props: ToggleListStyleProps) => {
  const { contentRef, listType, handleChange } = props;

  const { selection, range } = getSelectionContext();
  if (!range) return;

  const parentElement = getParentElement({ contentRef });
  if (parentElement?.nodeName === "LI") {
    // If already in a list, unwrap the list
    const list = parentElement.parentNode;
    if (list && list.nodeName === listType) {
      while (list.firstChild) {
        const li = list.firstChild;
        const p = document.createElement("p");
        p.innerHTML = (li as HTMLElement).innerHTML;
        list.parentNode?.insertBefore(p, list);
        list.removeChild(li);
      }
      list.parentNode?.removeChild(list);
    }
  } else {
    // If not in a list, wrap the current paragraph or selection in a list item within an unordered list
    const list = document.createElement(listType);
    const li = document.createElement("li");

    if (selection?.toString()) {
      // If there is selected text, wrap it in a list item
      li.appendChild(range.extractContents());
      list.appendChild(li);
      range.insertNode(list);
    } else {
      // If there's no selection, find the parent paragraph and replace it with a list item
      const parentP = getParentElement({ contentRef, tag: "P" });
      if (parentP) {
        li.innerHTML = parentP.innerHTML || "";
        parentP.parentNode?.replaceChild(list, parentP);
        list.appendChild(li);
      } else {
        // If there is no parent paragraph, this is a new list item at the cursor position
        li.innerHTML = "<br>"; // Add a break line if it's an empty list item
        range.insertNode(list);
        list.appendChild(li);
      }
    }

    // Set the cursor to the first list item
    setCursorAtStartOfElement(list.firstChild as HTMLElement);
  }

  // Update content
  handleChange();

  // Maintain focus.
  contentRef.current?.focus();
};

import "./styles.css";
import { ListIcon, ListIconDisabled } from "./assets";
import React, { useRef, useEffect } from "react";
import { HTMLTag, RichTextEditorProps } from "./types";
import {
  getParentElement,
  getSelectionContext,
  setCursorAfterElement,
  setCursorAtStartOfElement,
  removeTagFromSelection,
  sanitizeContent,
} from "./utils";

export const RichTextEditor = (props: RichTextEditorProps) => {
  const { content, setContent, readOnly = false } = props;

  // Using useRef hook to get a direct reference to the contentEditable div
  const contentRef = useRef<HTMLDivElement>(null);

  // Update content state.
  const handleChange = () => {
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

      const sanitizedContent = sanitizeContent(contentRef.current.innerHTML);
      setContent(sanitizedContent);
    }
  };

  const toggleStyle = (tag: HTMLTag) => {
    const { selection, range } = getSelectionContext();
    const styledParentElement = getParentElement({ contentRef, tag });
    const selectedText = range?.toString() ?? "";

    if (selectedText.trim() === "") {
      // Selected text is empty.
      if (styledParentElement !== null) {
        // Move cursor just outside of style element
        setCursorAfterElement(styledParentElement);
      } else {
        // Add style
        const element = document.createElement(tag);
        const textNode = document.createTextNode("\u200B"); // Zero-width space
        element.appendChild(textNode);

        if (range) {
          range.insertNode(element);
          range.setStart(textNode, 1);
          range.collapse(true);
          selection?.removeAllRanges();
          selection?.addRange(range);
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
        removeTagFromSelection(tag);

        const element = document.createElement(tag);
        if (range) {
          element.appendChild(range?.extractContents());
          range?.insertNode(element);
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

  // Function to toggle the header (h3) style
  const toggleHeaderStyle = () => {
    const { selection, range } = getSelectionContext();

    // Check if we have a selection
    const selectedText = range?.toString() ?? "";
    if (selectedText.trim() === "") {
      // No selection:
      // Insert a blank h3 element and place the cursor inside
      const h3 = document.createElement("h3");
      const textNode = document.createTextNode("\u200B"); // Zero-width space
      h3.appendChild(textNode);

      if (contentRef.current && range) {
        contentRef.current.appendChild(h3);
        range.setStart(textNode, 0);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    } else {
      // There is a selection: Toggle the h3 tag on the selection
      const parentElement = getParentElement({ contentRef, tag: "H3" });
      if (parentElement) {
        // If selection is already wrapped in h3, unwrap it
        parentElement.replaceWith(...Array.from(parentElement.childNodes));
      } else if (range) {
        // Wrap selection in h3
        const h3 = document.createElement("h3");
        const selectedContent = range.extractContents();
        h3.appendChild(selectedContent);
        range?.insertNode(h3);
      }
    }

    // Update content
    handleChange();
  };

  const toggleListStyle = () => {
    const { selection, range } = getSelectionContext();
    if (!range) return;

    const parentElement = getParentElement({ contentRef });
    if (parentElement?.nodeName === "LI") {
      // If already in a list, unwrap the list
      const ul = parentElement.parentNode;
      if (ul && ul.nodeName === "UL") {
        while (ul.firstChild) {
          const li = ul.firstChild;
          const p = document.createElement("p");
          p.innerHTML = (li as HTMLElement).innerHTML;
          ul.parentNode?.insertBefore(p, ul);
          ul.removeChild(li);
        }
        ul.parentNode?.removeChild(ul);
      }
    } else {
      // If not in a list, wrap the current paragraph or selection in a list item within an unordered list
      const ul = document.createElement("ul");
      const li = document.createElement("li");

      if (selection?.toString()) {
        // If there is selected text, wrap it in a list item
        li.appendChild(range.extractContents());
        ul.appendChild(li);
        range.insertNode(ul);
      } else {
        // If there's no selection, find the parent paragraph and replace it with a list item
        const parentP = getParentElement({ contentRef, tag: "P" });
        if (parentP) {
          li.innerHTML = parentP.innerHTML || "";
          parentP.parentNode?.replaceChild(ul, parentP);
          ul.appendChild(li);
        } else {
          li.innerHTML = "<br>"; // Add a break line if it's an empty list item
          contentRef.current?.appendChild(ul);
          ul.appendChild(li);
        }
      }
    }

    // Update content
    handleChange();

    // Maintain focus.
    contentRef.current?.focus();
  };

  // Handle when a key is pressed.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { currentNode, range } = getSelectionContext();
    const parentElement = getParentElement({ contentRef });

    if (e.key === "Enter") {
      if (parentElement && parentElement.nodeName === "LI") {
        e.preventDefault();
        const textContent = currentNode?.textContent || "";

        if (textContent.trim() === "") {
          // Exit the list if the current bullet point is empty
          const ul = parentElement.parentNode;
          const newP = document.createElement("p");
          newP.appendChild(document.createElement("br"));
          ul?.parentNode?.insertBefore(newP, ul.nextSibling);
          ul?.removeChild(parentElement);
          setCursorAtStartOfElement(newP);
        } else {
          // Create a new bullet point
          const newLi = document.createElement("li");
          newLi.appendChild(document.createElement("br"));
          parentElement.after(newLi);
          setCursorAtStartOfElement(newLi);
        }
      } else {
        // Insert paragraph for non-list items
        e.preventDefault();
        const p = document.createElement("p");
        const br = document.createElement("br");
        p.appendChild(br);

        if (parentElement && parentElement.parentElement) {
          parentElement.parentElement.appendChild(p);
        } else if (range) {
          range.insertNode(p);
        }

        setCursorAtStartOfElement(p);
      }
    }

    handleChange();
  };

  // Update content in the contentEditable when state changes
  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.innerHTML !== content) {
        contentRef.current.innerHTML = content;
      }
      // Track readOnly property changes
      contentRef.current.contentEditable = String(!readOnly);
    }
  }, [content]);

  return (
    <div className="container">
      <div className="toolbar">
        <button
          className="button"
          disabled={readOnly}
          onClick={() => toggleStyle("B")}
        >
          <b>B</b>
        </button>
        <button
          className="button"
          disabled={readOnly}
          onClick={() => toggleStyle("I")}
        >
          <i>I</i>
        </button>
        <button
          className="button"
          disabled={readOnly}
          onClick={() => toggleStyle("S")}
        >
          <s>S</s>
        </button>
        <button
          className="button"
          disabled={readOnly}
          onClick={() => toggleHeaderStyle()}
        >
          <b>H</b>
        </button>
        <button
          className="button"
          disabled={readOnly}
          onClick={() => toggleListStyle()}
        >
          <img
            src={!readOnly ? ListIcon : ListIconDisabled}
            alt="List Icon"
            className="icon"
          />
        </button>
      </div>
      <div
        ref={contentRef}
        contentEditable={true}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        className={`content ${readOnly ? "contentReadonly" : ""}`}
      />
    </div>
  );
};

import "./styles.css";
import {
  FontSizeIcon,
  FontSizeIconDisabled,
  HighlighterIcon,
  HighlighterIconDisabled,
  LinkIcon,
  LinkIconDisabled,
  ListIcon,
  ListIconDisabled,
  NumberedListIcon,
  NumberedListIconDisabled,
  TextIcon,
} from "./assets";
import React, { useRef, useEffect, useState } from "react";
import { HTMLTag, RichTextEditorProps } from "./types";
import {
  getParentElement,
  getSelectionContext,
  setCursorAfterElement,
  setCursorAtStartOfElement,
  removeTagFromSelection,
  sanitizeContent,
  setCursorAtStart,
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

      // Handle edge case for cursor positioning.
      if (content === "<br>") setCursorAtStart(contentRef);

      const sanitizedContent = sanitizeContent(contentRef.current.innerHTML);
      setContent(sanitizedContent);
    }
  };

  // State to manage popover visibility
  const [showHeaderPopover, setShowHeaderPopover] = useState(false);

  // Function to handle header style change and close popover
  const handleHeaderStyleChange = (size) => {
    toggleHeaderStyle(size);
    setShowHeaderPopover(false); // Hide popover
  };

  const toggleStyle = (tag: HTMLTag, className?: string) => {
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
        // Add style
        const element = document.createElement(tag);
        const textNode = document.createTextNode("\u200B"); // Zero-width space
        element.appendChild(textNode);

        // Add class names if provided
        if (className) {
          element.className = className;
        }

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
        removeTagFromSelection(tag, className);

        const element = document.createElement(tag);

        // Add class names if provided
        if (className) {
          element.className = className;
        }

        if (range) {
          element.appendChild(range?.extractContents());
          range?.insertNode(element);
        }

        // Remove any parent header sizes
        if (
          tag.startsWith("H") &&
          ["H1", "H2", "H3"].includes(
            getParentElement({ contentRef })?.nodeName
          )
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

  // Function to toggle the header style
  const toggleHeaderStyle = (size: "H1" | "H2" | "H3") => {
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
      toggleStyle(size);
    }

    // Update content
    handleChange();
  };

  // Function to toggle the list style
  const toggleListStyle = (listType: "OL" | "UL") => {
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

  // Replaces all headers in selection with p tags
  const removeHeadersFromSelection = () => {
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

  // Handle when a key is pressed.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
          parentElement.parentNode?.insertBefore(
            newP,
            parentElement.nextSibling
          );
        } else {
          // If there is no parent element, append the new paragraph to the content editable div
          contentRef.current?.appendChild(newP);
        }
        setCursorAtStartOfElement(newP);
      }

      handleChange();
    }
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
  }, [content, readOnly]);

  return (
    <div className="rt-container">
      <div className="rt-toolbar">
        <button
          className="rt-button"
          disabled={readOnly}
          onClick={() => toggleStyle("B")}
        >
          <b>B</b>
        </button>
        <button
          className="rt-button"
          disabled={readOnly}
          onClick={() => toggleStyle("I")}
        >
          <i>I</i>
        </button>
        <button
          className="rt-button"
          disabled={readOnly}
          onClick={() => toggleStyle("S")}
        >
          <s>S</s>
        </button>
        <button
          className="rt-button"
          disabled={readOnly}
          onClick={() => setShowHeaderPopover(!showHeaderPopover)}
        >
          <img
            src={!readOnly ? FontSizeIcon : FontSizeIconDisabled}
            alt="Font Size Icon"
            className="rt-icon"
          />
          {/* Popover for header styles */}
          {showHeaderPopover && !readOnly && (
            <div className="rt-headerPopover">
              <button
                className="rt-button"
                onClick={() => handleHeaderStyleChange("H1")}
              >
                <b>
                  H<sup>1</sup>
                </b>
              </button>
              <button
                className="rt-button"
                onClick={() => handleHeaderStyleChange("H2")}
              >
                <b>
                  H<sup>2</sup>
                </b>
              </button>
              <button
                className="rt-button"
                onClick={() => handleHeaderStyleChange("H3")}
              >
                <b>
                  H<sup>3</sup>
                </b>
              </button>
              <button
                className="rt-button"
                style={{ marginRight: 0 }}
                onClick={() => removeHeadersFromSelection()}
              >
                <img className="rt-icon" src={TextIcon} alt="Text Icon" />
              </button>
            </div>
          )}
        </button>
        <button
          className="rt-button"
          disabled={readOnly}
          onClick={() => toggleStyle("P", "rt-yellowHighlight")}
        >
          <img
            src={!readOnly ? HighlighterIcon : HighlighterIconDisabled}
            alt="Highlighter Icon"
            className="rt-icon"
          />
        </button>
        <button
          className="rt-button"
          disabled={readOnly}
          onClick={() => toggleListStyle("UL")}
        >
          <img
            src={!readOnly ? ListIcon : ListIconDisabled}
            alt="List Icon"
            className="rt-icon"
          />
        </button>
        <button
          className="rt-button"
          disabled={readOnly}
          onClick={() => toggleListStyle("OL")}
        >
          <img
            src={!readOnly ? NumberedListIcon : NumberedListIconDisabled}
            alt="Numbered List Icon"
            className="rt-icon"
          />
        </button>
        <button
          className="rt-button"
          disabled={readOnly}
          onClick={() => toggleStyle("P", "rt-yellowHighlight")}
        >
          <img
            src={!readOnly ? LinkIcon : LinkIconDisabled}
            alt="Link Icon"
            className="rt-icon"
          />
        </button>
      </div>
      <div
        ref={contentRef}
        contentEditable={true}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        className="rt-content"
      />
    </div>
  );
};

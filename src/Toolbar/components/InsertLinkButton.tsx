import React, { useRef, useState } from "react";
import { InsertLinkButtonProps, SelectionContext } from "../../types";
import { InsertIcon, LinkIcon } from "../../assets";
import { getSelectionContext, toggleStyle } from "../../utils";
import { Tooltip } from "./Tooltip";

export const InsertLinkButton = (props: InsertLinkButtonProps) => {
  const { readOnly = false, contentRef, handleChange } = props;

  // Create refs for the inputs
  const linkTextInputRef = useRef<HTMLInputElement>(null);

  // State to manage popover visibility
  const [showPopover, setShowPopover] = useState(false);

  // State to manage link inputs and content selection
  const [url, setUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [selectionContext, setSelectionContext] =
    useState<SelectionContext | null>(null);

  // Function to handle link style change and close popover
  const handleLinkStyleChange = () => {
    toggleStyle({
      contentRef,
      tag: "A",
      handleChange,
      options: { link: { url, linkText, selectionContext } },
    });
    setShowPopover(false); // Hide popover
    // Reset state
    setUrl("");
    setLinkText("");
  };

  // Handle popover open and close
  const togglePopover = () => {
    // Save selection state on open
    const selectionContext = getSelectionContext();
    if (!showPopover) setSelectionContext(selectionContext);

    // Open or close popover
    setShowPopover(!showPopover);
  };

  // Handle enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.name === "rt-urlInput") {
        // Current target is the URL input, focus the link text input
        linkTextInputRef.current?.focus();
      } else if (e.currentTarget.name === "rt-linkTextInput") {
        // Current target is the link text input, call handleLinkStyleChange
        handleLinkStyleChange();
      }
    }
  };

  return (
    <>
      <button className="rt-button" disabled={readOnly} onClick={togglePopover}>
        <Tooltip content="Insert Link">
          <LinkIcon disabled={readOnly} />
        </Tooltip>
      </button>
      {/* Popover */}
      {showPopover && !readOnly && (
        <div className="rt-linkPopover">
          <div>
            <input
              name="rt-urlInput"
              placeholder="URL"
              className="rt-input"
              type="text"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <input
              ref={linkTextInputRef}
              name="rt-linkTextInput"
              placeholder="Text"
              className="rt-input"
              type="text"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setLinkText(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className="rt-button"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleLinkStyleChange();
            }}
          >
            <Tooltip content="Insert">
              <InsertIcon />
            </Tooltip>
          </button>
        </div>
      )}
    </>
  );
};

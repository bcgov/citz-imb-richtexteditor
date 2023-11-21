import React, { useState } from "react";
import { InsertLinkButtonProps } from "../../types";
import { InsertIcon, LinkIcon, LinkIconDisabled } from "../../assets";

export const InsertLinkButton = (props: InsertLinkButtonProps) => {
  const { readOnly = false } = props;

  // State to manage popover visibility
  const [showPopover, setShowPopover] = useState(false);

  // State to manage link inputs
  const [link, setLink] = useState("");
  const [linkText, setLinkText] = useState("");

  // Function to handle link style change and close popover
  const handleLinkStyleChange = () => {
    //toggleStyle("A");
    setShowPopover(false); // Hide popover
    // Reset state
    setLink("");
    setLinkText("");
  };

  return (
    <button
      className="rt-button"
      disabled={readOnly}
      onClick={() => setShowPopover(!showPopover)}
    >
      <img
        src={!readOnly ? LinkIcon : LinkIconDisabled}
        alt="Link Icon"
        className="rt-icon"
      />
      {/* Popover */}
      {showPopover && !readOnly && (
        <div className="rt-linkPopover">
          <div>
            <input
              placeholder="URL"
              className="rt-input"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              placeholder="Text"
              className="rt-input"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setLinkText(e.target.value);
              }}
            />
          </div>
          <button className="rt-button" onClick={() => handleLinkStyleChange()}>
            <img src={InsertIcon} alt="Insert Icon" className="rt-icon" />
          </button>
        </div>
      )}
    </button>
  );
};

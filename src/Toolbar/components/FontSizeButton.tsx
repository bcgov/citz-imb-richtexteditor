import React, { useState } from "react";
import { FontSizeButtonProps } from "../../types";
import { removeHeadersFromSelection, toggleHeaderStyle } from "../../utils";
import { FontSizeIcon, FontSizeIconDisabled, TextIcon } from "../../assets";

export const FontSizeButton = (props: FontSizeButtonProps) => {
  const { readOnly = false, contentRef, handleChange } = props;

  // State to manage popover visibility
  const [showPopover, setShowPopover] = useState(false);

  // Function to handle header style change and close popover
  const handleHeaderStyleChange = (size) => {
    toggleHeaderStyle({ contentRef, size, handleChange });
    setShowPopover(false); // Hide popover
  };

  return (
    <button
      className="rt-button"
      disabled={readOnly}
      onClick={() => setShowPopover(!showPopover)}
    >
      <img
        src={!readOnly ? FontSizeIcon : FontSizeIconDisabled}
        alt="Font Size Icon"
        className="rt-icon"
      />
      {/* Popover */}
      {showPopover && !readOnly && (
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
            onClick={() =>
              removeHeadersFromSelection({ contentRef, handleChange })
            }
          >
            <img className="rt-icon" src={TextIcon} alt="Text Icon" />
          </button>
        </div>
      )}
    </button>
  );
};

import React, { useState } from "react";
import { FontSizeButtonProps } from "../../types";
import { removeHeadersFromSelection, toggleHeaderStyle } from "../../utils";
import { FontSizeIcon, FontSizeIconDisabled, TextIcon } from "../../assets";
import { Tooltip } from "./Tooltip";

export const FontSizeButton = (props: FontSizeButtonProps) => {
  const { readOnly = false, contentRef, handleChange, parentNodeName } = props;

  // State to manage popover visibility
  const [showPopover, setShowPopover] = useState(false);

  // Function to handle header style change and close popover
  const handleHeaderStyleChange = (size) => {
    toggleHeaderStyle({ contentRef, size, handleChange });
    setShowPopover(false); // Hide popover
  };

  return (
    <>
      <button
        className="rt-button"
        disabled={readOnly}
        onClick={() => setShowPopover(!showPopover)}
      >
        <Tooltip content="Font Size">
          <img
            src={!readOnly ? FontSizeIcon : FontSizeIconDisabled}
            alt="Font Size Icon"
            className="rt-icon"
          />
        </Tooltip>
      </button>
      {/* Popover */}
      {showPopover && !readOnly && (
        <div className="rt-headerPopover">
          <button
            className={`rt-button ${
              parentNodeName === "H1" ? "rt-button-active" : ""
            }`}
            onClick={() => {
              handleHeaderStyleChange("H1");
              setShowPopover(!showPopover);
            }}
          >
            <Tooltip content="Header 1">
              <b>
                H<sub>1</sub>
              </b>
            </Tooltip>
          </button>
          <button
            className={`rt-button ${
              parentNodeName === "H2" ? "rt-button-active" : ""
            }`}
            onClick={() => {
              handleHeaderStyleChange("H2");
              setShowPopover(!showPopover);
            }}
          >
            <Tooltip content="Header 2">
              <b>
                H<sub>2</sub>
              </b>
            </Tooltip>
          </button>
          <button
            className={`rt-button ${
              parentNodeName === "H3" ? "rt-button-active" : ""
            }`}
            onClick={() => {
              handleHeaderStyleChange("H3");
              setShowPopover(!showPopover);
            }}
          >
            <Tooltip content="Header 3">
              <b>
                H<sub>3</sub>
              </b>
            </Tooltip>
          </button>
          <button
            className="rt-button"
            style={{ marginRight: 0 }}
            onClick={() => {
              removeHeadersFromSelection({ contentRef, handleChange });
              setShowPopover(!showPopover);
            }}
          >
            <Tooltip content="Reset">
              <img className="rt-icon" src={TextIcon} alt="Text Icon" />
            </Tooltip>
          </button>
        </div>
      )}
    </>
  );
};

import React, { useState } from "react";
import { FontSizeButtonProps } from "../../types";
import { removeHeadersFromSelection, toggleHeaderStyle } from "../../utils";
import { FontSizeIcon, TextIcon } from "../../assets";
import { Tooltip } from "./Tooltip";

export const FontSizeButton = (props: FontSizeButtonProps) => {
  const { readOnly = false, contentRef, handleChange, parentElement } = props;

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
        type="button"
        onClick={() => setShowPopover(!showPopover)}
      >
        <Tooltip content="Font Size">
          <FontSizeIcon disabled={readOnly} />
        </Tooltip>
      </button>
      {/* Popover */}
      {showPopover && !readOnly && (
        <div className="rt-headerPopover">
          <button
            className={`rt-button ${
              parentElement?.nodeName === "H1" ? "rt-button-active" : ""
            }`}
            type="button"
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
              parentElement?.nodeName === "H2" ? "rt-button-active" : ""
            }`}
            type="button"
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
              parentElement?.nodeName === "H3" ? "rt-button-active" : ""
            }`}
            type="button"
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
            type="button"
            style={{ marginRight: 0 }}
            onClick={() => {
              removeHeadersFromSelection({ contentRef, handleChange });
              setShowPopover(!showPopover);
            }}
          >
            <Tooltip content="Reset">
              <TextIcon />
            </Tooltip>
          </button>
        </div>
      )}
    </>
  );
};

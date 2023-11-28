import React from "react";
import { ToolbarProps } from "../types";
import { FontSizeButton } from "./components/FontSizeButton";
import {
  HighlighterIcon,
  HighlighterIconDisabled,
  ListIcon,
  ListIconDisabled,
  NumberedListIcon,
  NumberedListIconDisabled,
  UndoIcon,
  UndoIconDisabled,
} from "../assets";
import { InsertLinkButton } from "./components/InsertLinkButton";
import {
  handleChange,
  toggleListStyle,
  toggleStyle,
  undoAction,
} from "../utils";
import { Tooltip } from "./components/Tooltip";

export const Toolbar = (props: ToolbarProps) => {
  const {
    readOnly = false,
    contentRef,
    content,
    setContent,
    undoStack,
    setUndoStack,
    parentNodeName,
  } = props;

  return (
    <div className="rt-toolbar">
      {/* BOLD */}
      <button
        className={`rt-button ${
          parentNodeName === "B" ? "rt-button-active" : ""
        }`}
        disabled={readOnly}
        onClick={() =>
          toggleStyle({
            contentRef,
            handleChange: () =>
              handleChange({ contentRef, content, setContent }),
            tag: "B",
          })
        }
      >
        <Tooltip content="Bold">
          <b>B</b>
        </Tooltip>
      </button>

      {/* ITALICS */}
      <button
        className={`rt-button ${
          parentNodeName === "I" ? "rt-button-active" : ""
        }`}
        disabled={readOnly}
        onClick={() =>
          toggleStyle({
            contentRef,
            handleChange: () =>
              handleChange({ contentRef, content, setContent }),
            tag: "I",
          })
        }
      >
        <Tooltip content="Italics">
          <b>
            <i>I</i>
          </b>
        </Tooltip>
      </button>
      {/* STRIKETHROUGH */}
      <button
        className={`rt-button ${
          parentNodeName === "S" ? "rt-button-active" : ""
        }`}
        disabled={readOnly}
        onClick={() =>
          toggleStyle({
            contentRef,
            handleChange: () =>
              handleChange({ contentRef, content, setContent }),
            tag: "S",
          })
        }
      >
        <Tooltip content="Strikethrough">
          <b>
            <s>S</s>
          </b>
        </Tooltip>
      </button>
      {/* FONT SIZE */}
      <FontSizeButton
        readOnly={readOnly}
        contentRef={contentRef}
        handleChange={() => handleChange({ contentRef, content, setContent })}
        parentNodeName={parentNodeName}
      />
      {/* HIGHLIGHTER */}
      <button
        className="rt-button"
        disabled={readOnly}
        onClick={() =>
          toggleStyle({
            contentRef,
            handleChange: () =>
              handleChange({ contentRef, content, setContent }),
            tag: "SPAN",
            className: "rt-yellowHighlight",
          })
        }
      >
        <Tooltip content="Highlight">
          <img
            src={!readOnly ? HighlighterIcon : HighlighterIconDisabled}
            alt="Highlighter Icon"
            className="rt-icon"
          />
        </Tooltip>
      </button>
      {/* BULLET LIST */}
      <button
        className="rt-button"
        disabled={readOnly}
        onClick={() =>
          toggleListStyle({
            contentRef,
            listType: "UL",
            handleChange: () =>
              handleChange({ contentRef, content, setContent }),
          })
        }
      >
        <Tooltip content="Bulleted List">
          <img
            src={!readOnly ? ListIcon : ListIconDisabled}
            alt="List Icon"
            className="rt-icon"
          />
        </Tooltip>
      </button>
      {/* NUMBERED LIST */}
      <button
        className="rt-button"
        disabled={readOnly}
        onClick={() =>
          toggleListStyle({
            contentRef,
            listType: "OL",
            handleChange: () =>
              handleChange({ contentRef, content, setContent }),
          })
        }
      >
        <Tooltip content="Numbered List">
          <img
            src={!readOnly ? NumberedListIcon : NumberedListIconDisabled}
            alt="Numbered List Icon"
            className="rt-icon"
          />
        </Tooltip>
      </button>
      {/* INSERT LINK */}
      <InsertLinkButton
        readOnly={readOnly}
        contentRef={contentRef}
        handleChange={() => handleChange({ contentRef, content, setContent })}
      />
      {/* UNDO */}
      <button
        className="rt-button"
        disabled={readOnly}
        onClick={() =>
          undoAction({
            undoStack,
            setUndoStack,
            setContent,
          })
        }
      >
        <Tooltip content="Undo">
          <img
            src={!readOnly ? UndoIcon : UndoIconDisabled}
            alt="Undo Icon"
            className="rt-icon"
          />
        </Tooltip>
      </button>
    </div>
  );
};

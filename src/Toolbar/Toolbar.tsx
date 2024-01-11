import React from "react";
import { ToolbarProps } from "../types";
import { FontSizeButton } from "./components/FontSizeButton";
import {
  HighlighterIcon,
  ListIcon,
  NumberedListIcon,
  UndoIcon,
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
    parentElement,
  } = props;

  return (
    <div className="rt-toolbar">
      {/* BOLD */}
      <button
        className={`rt-button ${
          parentElement?.nodeName === "B" ? "rt-button-active" : ""
        }`}
        disabled={readOnly}
        type="button"
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
          parentElement?.nodeName === "I" ? "rt-button-active" : ""
        }`}
        disabled={readOnly}
        type="button"
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
          parentElement?.nodeName === "S" ? "rt-button-active" : ""
        }`}
        disabled={readOnly}
        type="button"
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
        parentElement={parentElement}
      />
      {/* HIGHLIGHTER */}
      <button
        className={`rt-button ${
          parentElement?.className.includes("rt-yellowHighlight")
            ? "rt-button-active"
            : ""
        }`}
        disabled={readOnly}
        type="button"
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
          <HighlighterIcon disabled={readOnly} />
        </Tooltip>
      </button>
      {/* BULLET LIST */}
      <button
        className={`rt-button ${
          parentElement?.parentElement?.nodeName === "UL"
            ? "rt-button-active"
            : ""
        }`}
        disabled={readOnly}
        type="button"
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
          <ListIcon disabled={readOnly} />
        </Tooltip>
      </button>
      {/* NUMBERED LIST */}
      <button
        className={`rt-button ${
          parentElement?.parentElement?.nodeName === "OL"
            ? "rt-button-active"
            : ""
        }`}
        disabled={readOnly}
        type="button"
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
          <NumberedListIcon disabled={readOnly} />
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
        type="button"
        onClick={() =>
          undoAction({
            undoStack,
            setUndoStack,
            setContent,
          })
        }
      >
        <Tooltip content="Undo">
          <UndoIcon disabled={readOnly} />
        </Tooltip>
      </button>
    </div>
  );
};

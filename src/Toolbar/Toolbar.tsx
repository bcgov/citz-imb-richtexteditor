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
  } = props;

  return (
    <div className="rt-toolbar">
      {/* BOLD */}
      <button
        className="rt-button"
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
        <b>B</b>
      </button>
      {/* ITALICS */}
      <button
        className="rt-button"
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
        <b>
          <i>I</i>
        </b>
      </button>
      {/* STRIKETHROUGH */}
      <button
        className="rt-button"
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
        <b>
          <s>S</s>
        </b>
      </button>
      {/* FONT SIZE */}
      <FontSizeButton
        readOnly={readOnly}
        contentRef={contentRef}
        handleChange={() => handleChange({ contentRef, content, setContent })}
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
        <img
          src={!readOnly ? HighlighterIcon : HighlighterIconDisabled}
          alt="Highlighter Icon"
          className="rt-icon"
        />
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
        <img
          src={!readOnly ? ListIcon : ListIconDisabled}
          alt="List Icon"
          className="rt-icon"
        />
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
        <img
          src={!readOnly ? NumberedListIcon : NumberedListIconDisabled}
          alt="Numbered List Icon"
          className="rt-icon"
        />
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
        <img
          src={!readOnly ? UndoIcon : UndoIconDisabled}
          alt="Undo Icon"
          className="rt-icon"
        />
      </button>
    </div>
  );
};

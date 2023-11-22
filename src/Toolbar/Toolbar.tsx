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
} from "../assets";
import { InsertLinkButton } from "./components/InsertLinkButton";
import { handleChange, toggleListStyle, toggleStyle } from "../utils";

export const Toolbar = (props: ToolbarProps) => {
  const { readOnly = false, contentRef, content, setContent } = props;

  return (
    <div className="rt-toolbar">
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
      <FontSizeButton
        readOnly={readOnly}
        contentRef={contentRef}
        handleChange={() => handleChange({ contentRef, content, setContent })}
      />
      <button
        className="rt-button"
        disabled={readOnly}
        onClick={() =>
          toggleStyle({
            contentRef,
            handleChange: () =>
              handleChange({ contentRef, content, setContent }),
            tag: "P",
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
      <InsertLinkButton
        readOnly={readOnly}
        contentRef={contentRef}
        handleChange={() => handleChange({ contentRef, content, setContent })}
      />
    </div>
  );
};

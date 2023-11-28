import "./styles.css";
import React, { useRef, useEffect, useState } from "react";
import { RichTextEditorProps } from "./types";
import {
  getParentElement,
  handleChange,
  handleKeyDown,
  undoAction,
} from "./utils";
import { Toolbar } from "./Toolbar";

export const RichTextEditor = (props: RichTextEditorProps) => {
  const { content, setContent, readOnly = false } = props;

  // Track which element the cursor is in
  const [parentNodeName, setParentNodeName] = useState("");

  // Using useRef hook to get a direct reference to the contentEditable div
  const contentRef = useRef<HTMLDivElement>(null);

  // Track undo actions
  const [undoStack, setUndoStack] = useState([]);

  // Update content in the contentEditable when state changes
  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.innerHTML !== content) {
        contentRef.current.innerHTML = content;
      }
      // Track readOnly property changes
      contentRef.current.contentEditable = String(!readOnly);

      // Update parentNodeName when content changes used for toggling active buttons
      setParentNodeName(getParentElement({ contentRef })?.nodeName ?? "");

      // Add change to undo stack
      setUndoStack((prev) => [...prev, content]);
    }
  }, [content, readOnly]);

  return (
    <div
      className="rt-container"
      onClick={() => {
        // Updates parentNodeName used for toggling active buttons
        setParentNodeName(getParentElement({ contentRef })?.nodeName ?? "");
      }}
    >
      <Toolbar
        contentRef={contentRef}
        content={content}
        setContent={setContent}
        readOnly={readOnly}
        undoStack={undoStack}
        setUndoStack={setUndoStack}
        parentNodeName={parentNodeName}
      />
      <div
        ref={contentRef}
        contentEditable={true}
        onInput={() => handleChange({ contentRef, content, setContent })}
        onKeyDown={(e) =>
          handleKeyDown({
            contentRef,
            e,
            handleChange: () =>
              handleChange({ contentRef, content, setContent }),
            undoAction: () =>
              undoAction({ undoStack, setUndoStack, setContent }),
          })
        }
        className="rt-content"
      />
    </div>
  );
};

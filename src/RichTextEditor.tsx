import "./styles.css";
import React, { useRef, useEffect } from "react";
import { RichTextEditorProps } from "./types";
import { handleChange, handleKeyDown } from "./utils";
import { Toolbar } from "./Toolbar";

export const RichTextEditor = (props: RichTextEditorProps) => {
  const { content, setContent, readOnly = false } = props;

  // Using useRef hook to get a direct reference to the contentEditable div
  const contentRef = useRef<HTMLDivElement>(null);

  // Update content in the contentEditable when state changes
  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.innerHTML !== content) {
        contentRef.current.innerHTML = content;
      }
      // Track readOnly property changes
      contentRef.current.contentEditable = String(!readOnly);
    }
  }, [content, readOnly]);

  return (
    <div className="rt-container">
      <Toolbar
        contentRef={contentRef}
        content={content}
        setContent={setContent}
        readOnly={readOnly}
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
          })
        }
        className="rt-content"
      />
    </div>
  );
};

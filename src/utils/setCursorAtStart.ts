import { MutableRefObject } from "react";

export const setCursorAtStart = (
  contentRef: MutableRefObject<HTMLDivElement>
) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(contentRef.current);
  range.collapse(true); // collapse to start
  selection.removeAllRanges();
  selection.addRange(range);
};

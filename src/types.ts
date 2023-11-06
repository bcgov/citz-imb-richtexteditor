import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type RichTextEditorProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  readOnly?: boolean;
};

export type HTMLTag = "B" | "I" | "S" | "H3" | "P";

export type SelectionContext = {
  currentNode: Node | null;
  selection: Selection | null;
  range: Range | null;
};

export type GetParentElementProps = {
  contentRef: MutableRefObject<HTMLDivElement>;
  tag?: HTMLTag;
};

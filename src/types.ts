import { Dispatch, MutableRefObject, SetStateAction } from "react";

/**
 * PROPS
 */

export type RichTextEditorProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  readOnly?: boolean;
};

export type ToolbarProps = {
  readOnly?: boolean;
  contentRef: MutableRefObject<HTMLDivElement>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

export type FontSizeButtonProps = {
  readOnly?: boolean;
  contentRef: MutableRefObject<HTMLDivElement>;
  handleChange: () => void;
};

export type InsertLinkButtonProps = {
  readOnly?: boolean;
};

export type ToggleStyleProps = {
  contentRef: MutableRefObject<HTMLDivElement>;
  handleChange: () => void;
  tag: HTMLTag;
  className?: string;
};

export type ToggleListStyleProps = {
  contentRef: MutableRefObject<HTMLDivElement>;
  listType: "OL" | "UL";
  handleChange: () => void;
};

export type ToggleHeaderStyleProps = {
  contentRef: MutableRefObject<HTMLDivElement>;
  size: "H1" | "H2" | "H3";
  handleChange: () => void;
};

export type RemoveHeadersFromSelectionProps = {
  contentRef: MutableRefObject<HTMLDivElement>;
  handleChange: () => void;
};

export type HandleChangeProps = {
  contentRef: MutableRefObject<HTMLDivElement>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

export type HandleKeyDownProps = {
  e: React.KeyboardEvent<HTMLDivElement>;
  contentRef: MutableRefObject<HTMLDivElement>;
  handleChange: () => void;
};

export type GetParentElementProps = {
  contentRef: MutableRefObject<HTMLDivElement>;
  tag?: HTMLTag;
  className?: string;
};

/**
 * TYPES
 */

export type HTMLTag =
  | "B"
  | "I"
  | "S"
  | "H1"
  | "H2"
  | "H3"
  | "P"
  | "LI"
  | "DIV"
  | "A";

export type SelectionContext = {
  currentNode: Node | null;
  selection: Selection | null;
  range: Range | null;
};

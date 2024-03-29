import React from "react";

type UndoIconProps = {
  disabled?: boolean;
};

export const UndoIcon = (props: UndoIconProps) => {
  const { disabled = false } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16px"
      height="16px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      className="rt-icon"
    >
      <path
        d="M5 9.5C8.5 9.5 11.5 9.5 15 9.5C15.1615 9.5 19 9.5 19 13.5C19 18 15.2976 18 15 18C12 18 10 18 7 18"
        stroke={disabled ? "#a0a0a0" : "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13C7.13317 11.6332 6.36683 10.8668 5 9.5C6.36683 8.13317 7.13317 7.36683 8.5 6"
        stroke={disabled ? "#a0a0a0" : "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

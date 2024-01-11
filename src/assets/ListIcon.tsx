import React from "react";

type ListIconProps = {
  disabled?: boolean;
};

export const ListIcon = (props: ListIconProps) => {
  const { disabled = false } = props;
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rt-icon"
    >
      <path
        d="M8 6L21 6.00078M8 12L21 12.0008M8 18L21 18.0007M3 6.5H4V5.5H3V6.5ZM3 12.5H4V11.5H3V12.5ZM3 18.5H4V17.5H3V18.5Z"
        stroke={disabled ? "#a0a0a0" : "#000000"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

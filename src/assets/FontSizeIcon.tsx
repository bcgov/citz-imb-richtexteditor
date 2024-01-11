import React from "react";

type FontSizeIconProps = {
  disabled?: boolean;
};

export const FontSizeIcon = (props: FontSizeIconProps) => {
  const { disabled = false } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="16px"
      width="16px"
      fill={disabled ? "#a0a0a0" : ""}
      className="rt-icon"
    >
      <path
        d="m13.5004086 16.493803 2.4079342-7.22380254h2.1812571l2.9104001 8.72502844h-1.9680411l-.5686369-1.9267771h-2.9665097l-.6427438 1.9267771h-.8528973l.0016582.0049711h-2.7067526l-.7820768-2.65h-4.08l-.884 2.65h-2.55l4-12h3zm-6.5004086-3.493803h3l-1.504-4zm8.9083428 1.3596004h2.1812571l-1.0935369-2.9083428z"
        fillRule="evenodd"
      />
    </svg>
  );
};

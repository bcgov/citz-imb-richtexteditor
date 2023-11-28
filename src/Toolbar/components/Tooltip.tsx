import React, { useCallback, useEffect, useRef, useState } from "react";
import { TooltipProps } from "../../types";

/**
 * Tooltip component that provides additional information on hover.
 * @param {TooltipProps} props - Props for the Tooltip component.
 */
export const Tooltip = (props: TooltipProps) => {
  const { children, content } = props;
  const [visible, setVisible] = useState(false);
  const tooltipContainerRef = useRef(null);
  const tooltipContentRef = useRef<HTMLDivElement>(null);
  const tooltipPosition = "bottom";

  // Function to handle the mouse enter event when hovering over the tooltip container.
  const handleMouseEnter = () => {
    setVisible(true);
  };

  // Function to handle keyboard events for opening and closing the tooltip.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Check if the 'Enter' key is pressed.
    if (e.key === "Enter") {
      // Toggle the visibility of the tooltip.
      setVisible(!visible);
    }
  };

  return (
    <div
      className={"rt-tooltip-container"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
      onKeyDown={handleKeyDown}
      ref={tooltipContainerRef}
      tabIndex={0} // This makes the div focusable for keyboard interaction
    >
      <div
        className={`rt-tooltip-content-wrapper rt-tooltip-${tooltipPosition}`}
      >
        {children}
        {/* tooltip content */}
        {visible && (
          <div ref={tooltipContentRef} className="rt-tooltip-content">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

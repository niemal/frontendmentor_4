import React from "react";

const ClickableWrapper = ({ children, onClick, ...props }) => {
  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();

      if (onClick) {
        onClick(event);
      }
    }
  };

  const firstChild = React.Children.toArray(children)[0];
  const enhancedChild = React.cloneElement(firstChild, {
    tabIndex: "0",
    role: "button",
    onKeyDown: handleKeyDown,
    onClick,
    ...props,
    ...firstChild.props,
  });

  return enhancedChild;
};

export default ClickableWrapper;

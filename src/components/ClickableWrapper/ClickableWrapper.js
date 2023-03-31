import React, { useState, useEffect } from "react";

const ClickableWrapper = ({ children, onClick, ...props }) => {
  const handleKeyDown = (event) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();

      if (onClick) {
        onClick(event);
      }
    }

    if (firstChild.props.onKeyDown) {
      firstChild.props.onKeyDown(event);
    }
  };

  const handleMouseDown = (e) => {
    if (firstChild.props.onMouseDown) {
      firstChild.props.onMouseDown(e);
    }

    e.preventDefault();
  };

  const firstChild = React.Children.toArray(children)[0];
  const enhancedChild = React.cloneElement(firstChild, {
    tabIndex: "0",
    role: "button",
    onKeyDown: handleKeyDown,
    onMouseDown: handleMouseDown,
    onClick,
    ...props,
    ...firstChild.props,
  });

  return enhancedChild;
};

export default ClickableWrapper;

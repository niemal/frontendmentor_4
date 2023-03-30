import React, { useState } from "react";

const ClickableWrapper = ({ children, onClick, ...props }) => {
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
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

    if (event.key === "Tab") {
      setIsKeyboardFocused(true);
    }
  };

  const handleMouseDown = (e) => {
    if (firstChild.props.onMouseDown) {
      firstChild.props.onMouseDown(e);
    }

    setIsKeyboardFocused(false);
  };

  const handleBlur = (e) => {
    if (firstChild.props.onBlur) {
      firstChild.props.onBlur(e);
    }

    setIsKeyboardFocused(false);
  };

  const handleKeyUp = (e) => {
    if (firstChild.props.onKeyUp) {
      firstChild.props.onKeyUp(e);
    }

    if (e.key === "Tab") {
      setIsKeyboardFocused(true);
    }
  };

  let { style, ...myProps } = props;
  if (isKeyboardFocused) {
    if (!style) {
      style = {};
    }
    style.outline = "none !important";
  }

  const firstChild = React.Children.toArray(children)[0];
  const enhancedChild = React.cloneElement(firstChild, {
    tabIndex: "0",
    role: "button",
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onBlur: handleBlur,
    onClick,
    isKeyboardFocused,
    style,
    ...myProps,
    ...firstChild.props,
  });

  return enhancedChild;
};

export default ClickableWrapper;

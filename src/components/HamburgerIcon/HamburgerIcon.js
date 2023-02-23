import styled, { keyframes } from "styled-components";
import { QUERIES } from "../constants";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 35px;
  cursor: pointer;

  ${(p) =>
    p.trigger
      ? `
    position: fixed;
    z-index: 89;
    left: 24px;
    top: 32px;
  `
      : ""}
`;

const Line = styled.div`
  height: 3px;
  width: 20px;
  ${(p) => (p.trigger ? "display: none;" : "")}
  background-color: var(--color-very-dark-blue);
  transition: all 0.35s ease-in-out;

  transform: ${(p) => {
    switch (p.transform) {
      case "right":
        return "rotate(45deg) translateY(5px)";
      case "left":
        return "rotate(-45deg) translateY(-5px)";
      default:
        return "rotate(0deg)";
    }
  }};
`;

function HamburgerIcon({ onClick, ...props }) {
  const [trigger, setTrigger] = useState(false);

  return (
    <Wrapper
      onClick={() => {
        setTrigger((t) => !t);
        onClick();
      }}
      trigger={trigger}
      {...props}
    >
      <Line transform={trigger ? "right" : null} />
      <Line trigger={trigger} />
      <Line transform={trigger ? "left" : null} />
    </Wrapper>
  );
}

export default HamburgerIcon;

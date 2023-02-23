import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-black-fade);
  height: 100%;
  width: 100%;
  z-index: 88;
  transition: all 0.25s ease-in-out;
  opacity: ${(p) => (p.openUp ? "1" : "0")};
  ${(p) => (p.hide ? "display: none;" : "")}
`;

const slideIn = keyframes`
  0% {
    transform: translateX(-150%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    transform: translateX(-150%);
    opacity: 0;
  }
`;

const NavContainer = styled.div`
  width: 257px;
  background-color: var(--color-white);
  min-height: 100%;
  padding: 24px;

  animation: 0.35s ${(p) => (p.openUp ? slideIn : slideOut)} ease-in-out
    forwards;
`;

const NavWrapper = styled.div`
  margin-top: 128px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  transition: all 0.4s ease-in-out;
  opacity: ${(p) => (p.openUp ? "1" : "0")};
`;

const NavEntry = styled.div`
  cursor: pointer;
  font-family: var(--font-primary);
  font-weight: var(--font-weight-bold);
  font-size: ${16 / 16}rem;
`;

function MobileMenu({ openUp }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let timer;

    if (!openUp) {
      timer = setTimeout(() => {
        setHide(true);
      }, 250);
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper openUp={openUp} hide={hide}>
      <NavContainer openUp={openUp}>
        <NavWrapper openUp={openUp}>
          <NavEntry>Collections</NavEntry>
          <NavEntry>Men</NavEntry>
          <NavEntry>Women</NavEntry>
          <NavEntry>About</NavEntry>
          <NavEntry>Contact</NavEntry>
        </NavWrapper>
      </NavContainer>
    </Wrapper>
  );
}

export default MobileMenu;

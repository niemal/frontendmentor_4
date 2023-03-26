import { useContext, useState, useEffect } from "react";
import CartCard from "../CartCard";
import { CartContext } from "../MainBody";
import { QUERIES } from "../constants";
import styled, { keyframes } from "styled-components";
import HamburgerIcon from "../HamburgerIcon";
import MobileMenu from "../MobileMenu";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  position: relative;
  background-color: var(--color-white);
  margin: 0 auto;
  width: clamp(1160px, 9vw, 1300px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-gray-blue);
  padding: 32px 0px;

  @media ${QUERIES.exclusiveWidth} {
    width: 100%;
    padding: 32px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding: 24px;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  gap: 44px;
  align-items: center;
`;

const Logo = styled.img`
  object-fit: cover;
  width: 138px;
  height: 20px;

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

const MobileLogoWrapper = styled.div`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

const MobileLogo = styled(Logo)`
  @media ${QUERIES.phoneAndSmaller} {
    display: block;
    margin-top: -4px;
  }
`;

const NavWrapper = styled(LeftPanel)`
  gap: 24px;
  color: var(--color-dark-gray-blue);

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

const NavEntry = styled.a`
  text-decoration: none;
  font-family: var(--font-primary);
  font-weight: var(--font-weight-regular);
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease-in-out;
  color: var(--color-gray-blue);
  border-radius: 8px;

  &:hover {
    color: var(--color-very-dark-blue);
  }

  &:focus {
    outline: 2px outset var(--color-orange);
    outline-offset: 4px;
  }
`;

const RightPanel = styled(LeftPanel)`
  gap: 28px;

  @media ${QUERIES.phoneAndSmaller} {
    gap: 12px;
  }
`;

const CartContainer = styled.div`
  position: relative;
  height: 38px;
  width: 38px;
  display: grid;
  place-content: center;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;

  &:focus {
    outline: 2px outset var(--color-orange);
    outline-offset: 5px;
  }
`;

const Cart = styled.img`
  object-fit: cover;
  width: 100%;
  cursor: pointer;
`;

const cartAnimation = keyframes`
0% {
  opacity: 0;
}
30% {
  transform: rotate(-90deg);
}
60% {
  transform: rotate(90deg);
}
80% {
  transform: rotate(-90deg);
}
100% {
  transform: rotate(0deg);
  opacity: 1;
}
`;

const CartItemsNumber = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0px 8px;
  border-radius: 5000px;
  background-color: var(--color-orange);
  animation: 0.45s ${cartAnimation} ease-in-out forwards;
  color: var(--color-white);
  font-family: var(--font-primary);
  font-weight: var(--font-weight-bold);
  font-size: ${10 / 16}rem;
`;

const UserAvatar = styled.img`
  object-fit: cover;
  height: 40px;
  width: 40px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;

  &:focus {
    outline: 2px outset var(--color-orange);
    outline-offset: 4px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    height: 30px;
    width: 30px;
  }
`;

const MenuFiller = styled.div`
  width: 35px;
  height: 30px;
`;

function Layout({ user }) {
  const { cart, setCart, displayCart, setDisplayCart } =
    useContext(CartContext);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    let total = 0;
    for (let item of cart) {
      if (item.items) {
        total += item.items;
      } else {
        total += 1;
      }
    }

    setItemsInCart(total);
  }, [cart]);

  return (
    <Wrapper>
      <LeftPanel>
        <Logo src={"/frontendmentor_4/assets/logo.svg"} alt={"logo image"} />

        <MobileLogoWrapper>
          <HamburgerIcon
            onClick={() => {
              setMobileMenu((m) => !m);
            }}
          />
          {mobileMenu ? (
            <>
              <MobileMenu openUp={true} />
              <HamburgerIcon />
            </>
          ) : (
            ""
          )}
          {!mobileMenu ? <MobileMenu openUp={false} /> : ""}
          <MobileLogo
            src={"/frontendmentor_4/assets/logo.svg"}
            alt={"logo image"}
          />
        </MobileLogoWrapper>

        <NavWrapper aria-label={"Site navigation menu"}>
          <ClickableWrapper href={"#"}>
            <NavEntry>Collections</NavEntry>
          </ClickableWrapper>
          <ClickableWrapper href={"#"}>
            <NavEntry>Men</NavEntry>
          </ClickableWrapper>
          <ClickableWrapper href={"#"}>
            <NavEntry>Women</NavEntry>
          </ClickableWrapper>
          <ClickableWrapper href={"#"}>
            <NavEntry>About</NavEntry>
          </ClickableWrapper>
          <ClickableWrapper href={"#"}>
            <NavEntry>Contact</NavEntry>
          </ClickableWrapper>
        </NavWrapper>
      </LeftPanel>
      <RightPanel>
        <ClickableWrapper
          onClick={() => {
            setDisplayCart((d) => !d);
          }}
        >
          <CartContainer>
            <Cart
              src={"/frontendmentor_4/assets/icon-cart.svg"}
              alt={"cart image button"}
            />
            {itemsInCart > 0 ? (
              <CartItemsNumber>{itemsInCart}</CartItemsNumber>
            ) : (
              ""
            )}
          </CartContainer>
        </ClickableWrapper>

        <ClickableWrapper
          onClick={() => {
            setDisplayCart((d) => !d);
          }}
        >
          <UserAvatar src={user?.avatar} alt={"my image avatar button"} />
        </ClickableWrapper>
        {displayCart ? <CartCard openUp={true} /> : ""}
        {!displayCart ? <CartCard openUp={false} /> : ""}
      </RightPanel>
    </Wrapper>
  );
}

export default Layout;

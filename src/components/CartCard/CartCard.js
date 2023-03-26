import { CartContext } from "../MainBody";
import { AddToCartButton, ButtonCartLetters } from "../Product";
import { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const openUp = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  30% {
    transform: perspective(300px) rotateY(180deg);
  }
  99% {
    transform: scale(1) perspective(600px) rotateY(360deg);
  }
  100% {
    opacity: 1;
  }
`;

const closeUp = keyframes`
  0% {
    opacity: 1;
  }
  30% {
    transform: scale(1) perspective(600px) rotateY(360deg);
  }
  99% {
    transform: perspective(300px) rotateY(180deg);
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  font-family: var(--font-primary);
  top: 104px;
  right: 0px;
  display: flex;
  flex-direction: column;
  min-width: 270px;
  max-width: 340px;
  background-color: var(--color-white);
  box-shadow: 0px 10px 20px var(--color-gray-blue);
  border-radius: 0px 0px 12px 12px;
  animation: 0.35s ${(p) => (p.openUp ? openUp : closeUp)} ease-in forwards;
  z-index: 5;

  @media ${QUERIES.phoneAndSmaller} {
    width: 90%;
    left: 0px;
    margin: 0 auto;
    top: 96px;
  }
`;

const TopContainer = styled.div`
  font-size: ${14 / 16}rem;
  font-weight: var(--font-weight-bold);
  border-bottom: 1px solid var(--color-gray-blue);
  width: 100%;
  padding-top: 8px;
  padding-left: 18px;
  padding-bottom: 16px;
  text-align: left;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-height: 150px;
  transition: all 0.3s ease-in-out;
  opacity: ${(p) => p.opacity};
  padding: 12px 20px;
`;

const EmptyCart = styled.p`
  font-size: ${14 / 16}rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-gray-blue);
`;

const CartEntry = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CartItemImage = styled.img`
  object-fit: cover;
  width: 40px;
  height: 40px;
  border-radius: 4px;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CartItemTitle = styled.div`
  color: var(--color-dark-gray-blue);
  font-size: ${14 / 16}rem;
`;

const PriceWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const PriceInfo = styled.div`
  font-size: ${14 / 16}rem;
  color: var(--color-dark-gray-blue);
`;

const FinalPrice = styled.div`
  color: var(--color-very-dark-blue);
  font-weight: var(--font-weight-bold);
  font-size: ${14 / 16}rem;
`;

const DeleteImage = styled.img`
  padding: 4px;
  object-fit: cover;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 8px;

  &:focus {
    outline: 3px outset var(--color-orange);
    outline-offset: 0px;
  }
`;

function CartCard({ openUp }) {
  const { cart, setCart, setFilled, displayContent, setDisplayContent } =
    useContext(CartContext);

  const activateDisplay = () => {
    const timer = setTimeout(() => {
      setDisplayContent(true);
    }, 250);
    return () => clearTimeout(timer);
  };

  useEffect(activateDisplay, []);
  useEffect(activateDisplay, [cart]);

  return (
    <Wrapper openUp={openUp}>
      <TopContainer>Cart</TopContainer>
      <MainContainer opacity={displayContent ? "1" : "0"}>
        {!cart || cart.length === 0 ? (
          <EmptyCart>Your cart is empty.</EmptyCart>
        ) : (
          cart.map((item, idx) => (
            <CartEntry key={`cart item ${idx}`}>
              <CartItemImage
                src={item.gallery[0].thumbnail}
                alt={`cart entry ${idx} thumbnail image`}
              />

              <CartItemDetails>
                <CartItemTitle>{item.name}</CartItemTitle>
                <PriceWrapper>
                  <PriceInfo>
                    {item.discount && item.discount > 0
                      ? "$" +
                        parseFloat((item.price * item.discount) / 100).toFixed(
                          2
                        )
                      : "$" + parseFloat(item.price).toFixed(2)}{" "}
                    x {item.items}
                  </PriceInfo>
                  <FinalPrice>{"$" + item.totalPrice}</FinalPrice>
                </PriceWrapper>
              </CartItemDetails>

              <ClickableWrapper
                onClick={() => {
                  setDisplayContent(false);
                  const tmp = [];
                  for (let i = 0; i < cart.length; i++) {
                    if (idx === i) {
                      continue;
                    }
                    tmp.push(cart[i]);
                  }

                  setFilled(false);
                  setCart(tmp);
                }}
              >
                <DeleteImage
                  src={"/frontendmentor_4/assets/icon-delete.svg"}
                  alt={"delete cart entry image button"}
                />
              </ClickableWrapper>
            </CartEntry>
          ))
        )}

        {cart && cart.length > 0 ? (
          <ClickableWrapper
            aria-label={"checkout button"}
            style={{ marginTop: "8px" }}
          >
            <AddToCartButton>
              <ButtonCartLetters>Checkout</ButtonCartLetters>
            </AddToCartButton>
          </ClickableWrapper>
        ) : (
          ""
        )}
      </MainContainer>
    </Wrapper>
  );
}

export default CartCard;

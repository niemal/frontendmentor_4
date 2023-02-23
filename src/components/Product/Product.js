import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../MainBody";
import { QUERIES } from "../constants";
import Gallery from "../Gallery";

const Wrapper = styled.section`
  padding-top: 64px;
  width: clamp(960px, 9vw, 1200px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-primary);

  @media ${QUERIES.tabletAndSmaller} {
    width: 100%;
    justify-content: center;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 48px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    padding: 0px 12px;
    padding-bottom: 24px;
    gap: 32px;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  max-width: 464px;

  @media ${QUERIES.tabletAndSmaller} {
    align-items: center;
  }
  @media ${QUERIES.phoneAndSmaller} {
    align-items: start;
    gap: 12px;
  }
`;

const Company = styled.p`
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--color-orange);
  font-weight: var(--font-weight-bold);
  font-size: ${12 / 16}rem;

  @media ${QUERIES.tabletAndSmaller} {
    align-self: start;
    font-size: ${14 / 16}rem;
  }
`;

const Name = styled.p`
  font-size: ${40 / 16}rem;
  line-height: ${44 / 16}rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-top: -14px;

  @media ${QUERIES.tabletAndSmaller} {
    text-align: center;
  }

  @media ${QUERIES.phoneAndSmaller} {
    text-align: left;
    font-size: ${30 / 16}rem;
    line-height: ${34 / 16}rem;
  }
`;

const Description = styled.p`
  color: var(--color-dark-gray-blue);
  margin-top: -8px;

  @media ${QUERIES.tabletAndSmaller} {
    margin-top: -40px;
    text-align: center;
  }

  @media ${QUERIES.phoneAndSmaller} {
    text-align: left;
    font-size: ${16 / 16}rem;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 16px;
  }
`;

const PriceWithDiscount = styled.div`
  display: flex;
  gap: 12px;
  align-items: baseline;

  @media ${QUERIES.phoneAndSmaller} {
    align-items: center;
  }
`;

const Price = styled.span`
  font-size: ${20 / 16}rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-black);

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${32 / 16}rem;
  }
`;

const DiscountPercent = styled.span`
  color: var(--color-orange);
  background-color: var(--color-pale-orange);
  padding: 4px;
  border-radius: 4px;
  font-weight: var(--font-weight-bold);
`;

const OriginalPrice = styled.span`
  color: var(--color-gray-blue);
  text-decoration: line-through;
  text-decoration-width: 1px;

  @media ${QUERIES.phoneAndSmaller} {
    margin-left: auto;
  }
`;

const AddToCartWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  margin-top: 16px;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
  }
`;

const ItemCounter = styled.div`
  padding: 12px;
  display: flex;
  gap: 40px;
  align-items: center;
  background-color: var(--color-light-gray-blue);

  @media ${QUERIES.phoneAndSmaller} {
    gap: 0px;
    width: 100%;
    justify-content: space-evenly;
  }
`;

const IncreaseDecrease = styled.img`
  cursor: pointer;
  object-fit: cover;
  height: 15px;
  width: 15px;

  ${(p) => (p.filled ? "opacity: 0.5;" : "")}
`;

const ItemsSelected = styled.span`
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-gray-blue);
  padding: 0px 4px;

  @media ${QUERIES.phoneAndSmaller} {
    margin-left: auto;
    margin-right: auto;
    font-size: ${20 / 16}rem;
  }
`;

export const AddToCartButton = styled.div`
  padding: 12px 0px;
  display: grid;
  place-content: center;
  background-color: var(--color-orange);
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  user-select: none;
  border: 3px solid transparent;
  box-shadow: 0px 7px 17px var(--color-orange);
  z-index: 3;
  transition: all 0.3s ease-in-out;

  ${(p) => (p.filled ? "opacity: 0.5;" : "")}

  &:hover {
    ${(p) =>
      !p.filled
        ? `
    background-color: var(--color-pale-orange);
    border-color: var(--color-orange);
  `
        : ""}
  }
`;

const ButtonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ButtonCartIcon = styled.img`
  object-fit: cover;
  height: 25px;
  width: 25px;
  filter: invert(97%) sepia(97%) saturate(13%) hue-rotate(253deg)
    brightness(102%) contrast(100%);

  ${AddToCartButton}:hover & {
    filter: invert(75%) sepia(77%) saturate(5301%) hue-rotate(349deg)
      brightness(108%) contrast(101%);
  }
`;

export const ButtonCartLetters = styled.span`
  color: var(--color-white);
  font-weight: var(--font-weight-bold);

  ${AddToCartButton}:hover & {
    color: var(--color-orange);
  }
`;

function Product({ product, ...props }) {
  const [items, setItems] = useState(0);
  const { cart, setCart, filled, setFilled, setDisplayContent } =
    useContext(CartContext);

  const fillCartWithProduct = () => {
    if (items === 0) {
      return;
    }

    const tmp = [...cart];
    for (let i = 1; i < items; i++) {
      tmp.push(product);
    }
    // tmp.push({ ...product, items: items });
    setCart(tmp);
    setFilled(true);
  };

  useEffect(() => {
    setFilled(false);
  }, []);

  return (
    <Wrapper>
      <Gallery gallery={product.gallery} {...props} />
      <DetailsWrapper>
        <Company>{product.company}</Company>
        <Name>{product.name}</Name>
        <Description>{product.description}</Description>

        {product.discount && product.discount > 0 ? (
          <PriceWrapper>
            <PriceWithDiscount>
              <Price>
                {"$" +
                  parseFloat((product.price * product.discount) / 100).toFixed(
                    2
                  )}
              </Price>
              <DiscountPercent>{product.discount + "%"}</DiscountPercent>
            </PriceWithDiscount>
            <OriginalPrice>
              {"$" + parseFloat(product.price).toFixed(2)}
            </OriginalPrice>
          </PriceWrapper>
        ) : (
          <Price>{"$" + parseFloat(product.price).toFixed(2)}</Price>
        )}

        <AddToCartWrapper>
          <ItemCounter>
            <IncreaseDecrease
              filled={filled}
              onClick={(e) => {
                if (filled) {
                  e.preventDefault();
                  return;
                }

                setItems((i) => i + 1);
              }}
              src={"./assets/icon-plus.svg"}
              alt={"increase item count image"}
            />
            <ItemsSelected>{items}</ItemsSelected>
            <IncreaseDecrease
              filled={filled}
              onClick={(e) => {
                if (filled) {
                  e.preventDefault();
                  return;
                }

                setItems((i) => {
                  if (i - 1 < 0) {
                    return 0;
                  }
                  return i - 1;
                });
              }}
              style={{ height: "5px" }}
              src={"./assets/icon-minus.svg"}
              alt={"increase item count image"}
            />
          </ItemCounter>

          <AddToCartButton
            filled={filled}
            onClick={(e) => {
              if (filled) {
                e.preventDefault();
                return;
              }

              setDisplayContent(false);
              setTimeout(() => {
                fillCartWithProduct();
              }, 180);
              // fillCartWithProduct();
            }}
          >
            <ButtonInfo>
              <ButtonCartIcon
                src={"./assets/icon-cart.svg"}
                alt={"cart icon"}
              />
              <ButtonCartLetters>Add to cart</ButtonCartLetters>
            </ButtonInfo>
          </AddToCartButton>
        </AddToCartWrapper>
      </DetailsWrapper>
    </Wrapper>
  );
}

export default Product;

import Layout from "../Layout";
import Product from "../Product";
import styled from "styled-components";
import { createContext, useState, useEffect } from "react";

const Wrapper = styled.main`
  height: 100%;
`;

export const CartContext = createContext();

function MainBody() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [parsedCart, setParsedCart] = useState(false);
  const [displayContent, setDisplayContent] = useState(false);
  const [displayCart, setDisplayCart] = useState(false);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!parsedCart) {
      const tmp = [];
      let total = 0;
      const parsedIds = [];
      for (let i = 0; i < cart.length; i++) {
        if (!parsedIds.includes(cart[i].id)) {
          let itemsN = cart[i].items || 1;
          for (let y = 0; y < cart.length; y++) {
            if (cart[i].id === cart[y].id) {
              if (cart[y].items) {
                itemsN += cart[y].items;
              } else {
                itemsN += 1;
              }
            }
          }

          const finalItem = { ...cart[i], items: itemsN };
          if (finalItem.discount && finalItem.discount > 0) {
            finalItem.totalPrice =
              itemsN * ((finalItem.price * finalItem.discount) / 100);
          } else {
            finalItem.totalPrice = itemsN * finalItem.price;
          }

          total += finalItem.items;
          parsedIds.push(finalItem.id);
          tmp.push(finalItem);
        }
      }

      setParsedCart(true);
      setCartTotal(total);
      setCart(tmp);
    } else {
      setParsedCart(false);
    }
  }, [cart]);

  return (
    <Wrapper>
      <CartContext.Provider
        value={{
          cart,
          setCart,
          cartTotal,
          setCartTotal,
          filled,
          setFilled,
          displayContent,
          setDisplayContent,
          displayCart,
          setDisplayCart,
        }}
      >
        <Layout
          user={{
            avatar: "./assets/image-avatar.png",
          }}
        />
        <Product
          onClick={() => {
            setDisplayCart(false);
          }}
          product={{
            id: 0,
            company: "Sneaker Company",
            name: "Fall Limited Edition Sneakers",
            description:
              "These low profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
            price: 250,
            discount: 50,
            gallery: [
              {
                img: "./assets/image-product-1.jpg",
                thumbnail: "./assets/image-product-1-thumbnail.jpg",
              },
              {
                img: "./assets/image-product-2.jpg",
                thumbnail: "./assets/image-product-2-thumbnail.jpg",
              },
              {
                img: "./assets/image-product-3.jpg",
                thumbnail: "./assets/image-product-3-thumbnail.jpg",
              },
              {
                img: "./assets/image-product-4.jpg",
                thumbnail: "./assets/image-product-4-thumbnail.jpg",
              },
            ],
          }}
        />
      </CartContext.Provider>
    </Wrapper>
  );
}

export default MainBody;

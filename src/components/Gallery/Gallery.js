import styled, { keyframes } from "styled-components";
import { useState, useEffect, createContext } from "react";
import GalleryFullscreen from "../GalleryFullscreen";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 444px;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: rotate(260deg) scale(0.3);
  }
  80% {
    transform: scale(1.3);
    border: 1px solid var(--color-orange);
    box-shadow: 3px 4px 16px var(--color-pale-orange);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) scale(1);
    border: none;
    box-shadow: none;
  }
`;

const MainImage = styled.img`
  opacity: 0;
  cursor: pointer;
  object-fit: cover;
  width: 370px;
  height: 370px;
  transition: all 0.3s ease-in-out;
  border-radius: 12px;
  animation: 0.45s ${fadeIn} ease-in-out forwards;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    outline: 3px outset var(--color-orange);
  }

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

export const ThumbnailRow = styled.div`
  display: flex;
  gap: 20px;
  max-width: 444px;
  overflow: auto;

  ${(p) => (!p.trigger ? "margin-top: 394px;" : "")}
  ${(p) => (!p.trigger && p.fullscreen ? "margin-top: 550px;" : "")}

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

export const ThumbnailContainer = styled.div`
  width: 75px;
  height: 75px;
  transition: all 0.3s ease-in;
  border: 3px solid
    ${(p) => (p.selected ? "var(--color-orange)" : "transparent")};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  &:focus {
    outline: 3px outset var(--color-orange);
  }
`;

export const ThumbnailImage = styled.img`
  object-fit: cover;
  width: 75px;
  height: 75px;
  opacity: ${(p) => (p.selected ? "0.5" : "1")};

  ${ThumbnailContainer}:hover & {
    opacity: 0.5;
  }
`;

const MobileGallery = styled.div`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: block;
  }
`;

export const GalleryContext = createContext();

function Gallery({ gallery, ...props }) {
  const [index, setIndex] = useState(0);
  const [mainImage, setMainImage] = useState(gallery[0].img);
  const [trigger, setTrigger] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    setTrigger(false);
    const timer = setTimeout(() => {
      setMainImage(gallery[index].img);
      setTrigger(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [index]);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <Wrapper {...props}>
      <GalleryContext.Provider
        value={{
          index,
          setIndex,
          fullscreen,
          setFullscreen,
          mainImage,
          trigger,
        }}
      >
        <MobileGallery>
          <GalleryFullscreen mobile={true} gallery={gallery} />
        </MobileGallery>
        {fullscreen ? <GalleryFullscreen gallery={gallery} /> : ""}
      </GalleryContext.Provider>
      {fullscreen ? (
        <MainImage src={mainImage} alt={"main product image"} />
      ) : trigger ? (
        <ClickableWrapper
          onClick={() => {
            setFullscreen(true);
          }}
        >
          <MainImage
            src={mainImage}
            alt={"main product image, switch to fullscreen button"}
          />
        </ClickableWrapper>
      ) : (
        ""
      )}
      <ThumbnailRow trigger={trigger} aria-label={"thumbnail navigation"}>
        {gallery.map((entry, idx) => (
          <ClickableWrapper
            onClick={() => {
              setIndex(idx);
            }}
            key={idx}
            selected={idx === index}
          >
            <ThumbnailContainer>
              <ThumbnailImage
                selected={idx === index}
                src={entry.thumbnail}
                alt={
                  "product image " + (idx + 1) + ", switch to fullscreen button"
                }
              />
            </ThumbnailContainer>
          </ClickableWrapper>
        ))}
      </ThumbnailRow>
    </Wrapper>
  );
}

export default Gallery;

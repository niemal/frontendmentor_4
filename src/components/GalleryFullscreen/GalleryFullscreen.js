import { useContext, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  GalleryContext,
  ThumbnailRow,
  ThumbnailContainer,
  ThumbnailImage,
} from "../Gallery";
import { QUERIES } from "../constants";
import { hoverSupported } from "../hoverSupported";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  width: 100%;
  ${(p) =>
    !p.mobile
      ? `
  z-index: 88;
  position: fixed;
  min-height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--color-black-fade);
`
      : ""}
  overflow: hidden;
  display: grid;
  place-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: max-content;
`;

const MyThumbnailRow = styled.div`
  padding-left: 8px;
  padding-right: 8px;
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

const CloseButton = styled.img`
  object-fit: cover;
  width: 49px;
  height: 49px;
  align-self: end;
  cursor: pointer;
  padding: 12px;
  margin-right: 12px;
  margin-top: 28px;

  filter: invert(97%) sepia(97%) saturate(13%) hue-rotate(253deg)
    brightness(102%) contrast(100%);
  transition: all 0.3s ease-in-out;
  border-radius: 8px;

  &:focus {
    outline: 2px outset var(--color-orange);
    outline-offset: 3px;
  }

  &:hover {
    filter: invert(75%) sepia(77%) saturate(5301%) hue-rotate(349deg)
      brightness(108%) contrast(101%);
  }

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 520px;
  height: 520px;
  border-radius: 12px;
  display: grid;
  place-content: center;
  margin-top: -32px;

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 0px;
    ${(p) => (!p.trigger ? "margin-top: 343px;" : "")}
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(150%);
    opacity: 0;
  }
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

const slideFromLeft = keyframes`
  0% {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-150%) scale(0);
    opacity: 0;
  }
  100% {
    position: relative;
    transform: translateX(0%) scale(1) rotate(-360deg);
    opacity: 1;
  }
`;

const slideFromRight = keyframes`
  0% {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(150%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translateX(0%) scale(1) rotate(-360deg);
    position: relative;
    opacity: 1;
  }
`;

const slideToLeft = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-150%) scale(0) rotate(360deg);
  }
`;

const slideToRight = keyframes`
  0% {
    transform: translateX(0%);
    position: relative;
  }
  100% {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(150%) scale(0) rotate(-360deg);
  }
`;

const MainImage = styled.img`
  object-fit: cover;
  width: 470px;
  height: 470px;
  border-radius: 12px;
  animation: 0.35s
    ${(p) => {
      switch (p.slide) {
        case "fromLeft":
          return slideFromLeft;
        case "fromRight":
          return slideFromRight;
        case "toLeft":
          return slideToLeft;
        case "toRight":
          return slideToRight;
        default:
          return;
      }
    }}
    ease-in-out forwards;
  z-index: 3;

  @media ${QUERIES.phoneAndSmaller} {
    width: 375px;
    height: 375px;
    border-radius: 0px;
  }
`;

const LeftButtonContainer = styled.div`
  position: absolute;
  width: 45px;
  height: 45px;
  left: 0px;
  border-radius: 50%;
  background-color: var(--color-white);
  padding: 18px;
  top: 45%;
  display: grid;
  place-content: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 4;

  &:focus {
    outline: 3px outset var(--color-orange);
    outline-offset: -4px;
  }

  ${hoverSupported(`
  &:hover { 
    background-color: var(--color-orange);
  }
    `)}

  @media ${QUERIES.phoneAndSmaller} {
    left: 24px;
    top: 50%;
  }
`;

const RightButtonContainer = styled(LeftButtonContainer)`
  left: auto;
  right: 0px;

  @media ${QUERIES.phoneAndSmaller} {
    right: 24px;
  }
`;

const NextPreviousButton = styled.img`
  width: 10px;
  height: 10px;
  object-fit: cover;

  ${hoverSupported(css`
    ${LeftButtonContainer}:hover &, ${RightButtonContainer}:hover & {
      filter: invert(97%) sepia(97%) saturate(13%) hue-rotate(253deg)
        brightness(102%) contrast(100%);
    }
  `)}
`;

function GalleryFullscreen({ gallery, mobile }) {
  const { index, setIndex, fullscreen, setFullscreen, mainImage, trigger } =
    useContext(GalleryContext);
  const [myIndex, setMyIndex] = useState(index);
  const [slideRight, setSlideRight] = useState(false);
  const [myTrigger, setMyTrigger] = useState(true);
  const [myImage, setMyImage] = useState(mainImage);
  const [oldImage, setOldImage] = useState(mainImage);

  useEffect(() => {
    setMyTrigger(false);
    const timer = setTimeout(() => {
      setOldImage(myImage);
      setMyImage(gallery[myIndex].img);
      setMyTrigger(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [myIndex]);

  return (
    <Wrapper mobile={mobile}>
      <Container>
        <ClickableWrapper
          onClick={() => {
            setFullscreen(false);
          }}
        >
          <CloseButton
            src={"/frontendmentor_4/assets/icon-close.svg"}
            alt={"close gallery fullscreen button"}
          />
        </ClickableWrapper>
        <MainImageContainer trigger={myTrigger}>
          {myTrigger ? (
            <>
              {oldImage !== myImage ? (
                <MainImage
                  slide={slideRight ? "toRight" : "toLeft"}
                  src={oldImage}
                  alt={"gallery main image view"}
                />
              ) : (
                ""
              )}
              <MainImage
                slide={slideRight ? "fromLeft" : "fromRight"}
                src={myImage}
                alt={"gallery main image view"}
              />
            </>
          ) : (
            ""
          )}

          <ClickableWrapper
            onClick={() => {
              if (myIndex - 1 < 0) {
                setMyIndex(gallery.length - 1);
              } else {
                setMyIndex(myIndex - 1);
              }

              setSlideRight(false);
            }}
            aria-label={"Previous image gallery button"}
          >
            <LeftButtonContainer>
              <NextPreviousButton
                src={"/frontendmentor_4/assets/icon-previous.svg"}
                alt={"previous image gallery view"}
              />
            </LeftButtonContainer>
          </ClickableWrapper>

          <ClickableWrapper
            onClick={() => {
              if (myIndex + 1 === gallery.length) {
                setMyIndex(0);
              } else {
                setMyIndex(myIndex + 1);
              }

              setSlideRight(true);
            }}
            aria-label={"Next image gallery button"}
          >
            <RightButtonContainer>
              <NextPreviousButton
                src={"/frontendmentor_4/assets/icon-next.svg"}
                alt={"Next image gallery button"}
              />
            </RightButtonContainer>
          </ClickableWrapper>
        </MainImageContainer>
        <MyThumbnailRow trigger={trigger} fullscreen={fullscreen}>
          {gallery.map((entry, idx) => (
            <ClickableWrapper
              key={idx + " fullscreen"}
              selected={idx === myIndex}
              onClick={() => {
                if (idx > myIndex) {
                  setSlideRight(true);
                } else {
                  setSlideRight(false);
                }

                setMyIndex(idx);
              }}
            >
              <ThumbnailContainer>
                <ThumbnailImage
                  selected={idx === myIndex}
                  src={entry.thumbnail}
                  alt={
                    "product image thumbnail  " + (idx + 1) + ", gallery button"
                  }
                />
              </ThumbnailContainer>
            </ClickableWrapper>
          ))}
        </MyThumbnailRow>
      </Container>
    </Wrapper>
  );
}

export default GalleryFullscreen;

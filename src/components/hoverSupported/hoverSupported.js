import { css } from "styled-components";

export const hoverSupported = (style) => css`
  @media not all and (pointer: coarse) {
    ${style};
  }
`;

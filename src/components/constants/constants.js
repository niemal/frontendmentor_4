export const COLORS = {
  white: "hsl(0, 0%, 100%)",
  black: "hsl(0, 0%, 0%)",
  orange: "hsl(26, 100%, 55%)",
  pale_orange: "hsl(25, 100%, 94%)",
  very_dark_blue: "hsl(220, 13%, 13%)",
  dark_gray_blue: "hsl(219, 9%, 45%)",
  gray_blue: "hsl(220, 14%, 75%)",
  light_gray_blue: "hsl(223, 64%, 98%)",
  black_fade: "hsla(0, 0%, 0%, 0.75)",
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1080,
  exclusiveWidth: 1285,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  exclusiveWidth: `(max-width: ${BREAKPOINTS.exclusiveWidth / 16}rem)`,
};

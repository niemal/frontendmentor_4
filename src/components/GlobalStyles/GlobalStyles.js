import { createGlobalStyle } from "styled-components";
import { COLORS } from "../constants";

const GlobalStyles = createGlobalStyle`
/* CSS Reset */
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
}
#root {
  isolation: isolate;
  min-height: 100%;
  width: 100%;
}
html, body, #__next, #__next > div {
  height: 100%;
}
body {
  font-family: var(--font-primary);
  font-weight: var(--font-weight-regular);
  font-size: ${16 / 16}rem;
  background-color: var(--color-white);
}
a:focus {
  outline: 5px auto var(--color-primary);
}
body, input, button, select, option {
  font-family: var(--font-family);
  font-weight: var(--font-weight-medium);
}
h1, h2, h3, h4, h5, h6, strong {
  font-weight: var(--font-weight-bold);
}
h1, h2 h3, h4, h5, h6, p {
  text-rendering: optimizeLegibility;
}
p {
  margin-bottom: 1.5em;
  font-size: 1.125rem;
}
em {
  font-style: italic;
}

/* CSS Variables */
:root {
  --font-weight-regular: 400;
  --font-weight-bold: 700;
  --font-primary: 'Kumbh Sans', sans-serif;
  
  --color-white: ${COLORS.white};
  --color-black: ${COLORS.black};
  --color-black-fade: ${COLORS.black_fade};
  --color-orange: ${COLORS.orange};
  --color-pale-orange: ${COLORS.pale_orange};
  --color-very-dark-blue: ${COLORS.very_dark_blue};
  --color-dark-gray-blue: ${COLORS.dark_gray_blue};
  --color-gray-blue: ${COLORS.gray_blue};
  --color-light-gray-blue: ${COLORS.light_gray_blue};
}
`;

export default GlobalStyles;

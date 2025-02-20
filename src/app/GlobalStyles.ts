import { createGlobalStyle } from "styled-components";

import { Inter } from "next/font/google";

const inter = Inter({
    weight :['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ["latin"]
 });
export const GlobalStyles = createGlobalStyle`



:root {
  --font-family: ${inter.style.fontFamily}, sans-serif;
}

body{
    margin: 0;
    padding: 0;
    text-decoration: none;
}

`
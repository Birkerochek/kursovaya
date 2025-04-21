"use client";

import { createGlobalStyle } from "styled-components";

import { Inter } from "next/font/google";

const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800',  '900'],
    subsets: ["latin"]
 });
export const GlobalStyles = createGlobalStyle`

:root {
  --font-family: ${inter.style.fontFamily}, sans-serif;
  --color-primary: #0B5C7E;
  --color-accent: #2573D8;
  --color-help: #1b3764;
  --color-black: #000000;
  --color-white: #ffffff;
  --color-grey: #333333;
  --color-grey-white: #f5f5f5;
  --color-pending: #ff9800;
  --color-approved: #4caf50;
  --color-rejected: #f44336;
}

body{
  font-family: var(--font-family);
    margin: 0;
    padding: 0;
    text-decoration: none;
}

`
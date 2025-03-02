"use client";

import "./globals.css";
import { GlobalStyles } from "./GlobalStyles";
import Header from "./components/Header/Header";
import Links from "./components/Links/Links";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <GlobalStyles />
          <Header />
          <Links />
          {children}
      </body>
    </html>
  );
}

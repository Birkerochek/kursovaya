"use client";

import "./globals.css";
import { GlobalStyles } from "./GlobalStyles";
import Header from "./components/Header/Header";
import Links from "./components/Links/Links";
import AuthProvider from "./providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <GlobalStyles />
          <Header />
          <Links />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

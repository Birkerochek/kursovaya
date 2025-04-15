"use client";

import "./globals.css";
import { GlobalStyles } from "./GlobalStyles";
import Header from "./components/Header/Header";
import Links from "./components/Links/Links";
import AuthProvider from "./providers/AuthProvider";
import Footer from "./components/Footer/Footer";

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
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}

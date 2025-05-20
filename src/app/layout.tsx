

import "./globals.css";
import { GlobalStyles } from "./GlobalStyles";
import Header from "./components/Header/Header";
import Links from "./components/Links/Links";
import AuthProvider from "./providers/AuthProvider";
import Footer from "./components/Footer/Footer";
import ClientQueryProvider from "./provider";
import Head from "next/head";
export const metadata = {
  title: "RemTopia",
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <ClientQueryProvider>
          <AuthProvider>
            <GlobalStyles />
            <Header />
            <Links />
            {children}
            <Footer />
          </AuthProvider>

        </ClientQueryProvider>
      </body>
    </html>
  );
}

import React from "react";
import { Inter } from "next/font/google";
import Wrapper from "@/components/wrapper";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning={true}
      data-scroll-behavior="smooth"
    >
      <body className={inter.className}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}

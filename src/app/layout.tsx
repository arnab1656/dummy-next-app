import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SessionWrapper from "./component/sessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dummy Next App",
  description: "Generated by Arnab Paul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className}>{children}</body>
      </SessionWrapper>
    </html>
  );
}

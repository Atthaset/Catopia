import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const noto_san_thai = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  title: "Catopia",
  description: "Web application that suggest cat based on behavior",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logoweb.svg" />
      </head>
      <body className={noto_san_thai.className}>{children}</body>
    </html>
  );
}

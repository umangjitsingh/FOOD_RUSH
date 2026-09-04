import type { Metadata } from "next";
import {Copse,  Montserrat,} from "next/font/google";
import "./globals.css";

const copse =Copse({
  variable: "--font-copse",
  subsets: ["latin"],
  weight:["400"]
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Rush",
  description: "Get your food delivered | Food Rush",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${copse.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col w-full bg-[#0d0e14]">{children}</body>
    </html>
  );
}

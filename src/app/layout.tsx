import type { Metadata } from "next";
import { DM_Serif_Display, Geist, Geist_Mono, } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif' })

export const metadata: Metadata = {
  title: 'savor. — Good food, closer than you think',
  description: 'Discover the best local dishes, delivered warm and wonderfully fast.',
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="flex flex-col w-full bg-[#0d0e14]">{children}</body>
    </html>
  );
}

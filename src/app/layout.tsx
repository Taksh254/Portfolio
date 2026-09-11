import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader, Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taksh Sehrawat — AI Engineer & Developer | TAKSH.OS",
  description:
    "Personal engineering workspace of Taksh Sehrawat. AI Systems, Autonomous Agents, Automation & Experimental Engineering. TAKSH.OS v2.1.0",
  keywords: [
    "Taksh Sehrawat",
    "AI Engineer",
    "Engineer Portfolio",
    "AI Systems",
    "Operating System Portfolio",
    "Machine Learning",
    "Autonomous Agents",
    "Automation",
  ],
  authors: [{ name: "Taksh Sehrawat" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${caveat.variable} ${playfair.variable} scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-[#F4F1E8] text-[#111111] font-sans antialiased overflow-x-hidden overflow-y-auto"
      >
        {children}
      </body>
    </html>
  );
}

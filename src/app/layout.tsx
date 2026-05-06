import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bdoGrotesk = localFont({
  src: "../../public/BDOGrotesk-VF-BF648a657078401.ttf",
  variable: "--font-bdo-grotesk",
});

import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Piyush Yadav | Full-Stack Developer",
  description: "Portfolio of Piyush Yadav, a Full-Stack Developer and UI/UX Designer crafting responsive, user-friendly web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bdoGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

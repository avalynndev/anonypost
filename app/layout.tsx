import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Anonymous Posts",
  description:
    "Share your thoughts and experiences anonymously by posting on our platform — no sign-up needed!",
  openGraph: {
    type: "website",
    url: "https://anonypost.vercel.app",
    title: "Anonymous Posts",
    description:
      "Share your thoughts and experiences anonymously by posting on our platform — no sign-up needed!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${nunito.variable} ${ptSans.variable} antialiased relative`}
      >
        <div className="texture" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";

export const metadata: Metadata = {
  title: "Bomis Anonymous Posts",
  description:
    "Share your thoughts and experiences anonymously by posting on our platform — no sign-up needed!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
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
      <body>
        <TRPCReactProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <Navbar />
            {children}
            <Footer />
          </NextThemesProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

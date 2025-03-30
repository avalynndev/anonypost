import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import Meta from "~/components/meta";

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
    images: [
      {
        url: "https://anonypost.vercel.app/splash/manifest-icon-192.maskable.png",
        width: 192,
        height: 192,
        alt: "Anonymous Posts",
      },
      {
        url: "https://anonypost.vercel.app/splash/manifest-icon-512.maskable.png",
        width: 512,
        height: 512,
        alt: "Anonymous Posts",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <Meta />
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
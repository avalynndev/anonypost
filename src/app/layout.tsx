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
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
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

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TRPCReactProvider } from "~/trpc/react";
import { Footer } from "~/components/footer";

export const metadata: Metadata = {
  title: "Bomis Anonymous Posts",
  description:
    "A website where you can enter anonymous posts for others to read.",
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
            defaultTheme="system"
            enableSystem
          >
            {children} 
            <Footer/>
          </NextThemesProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";
import themeSystem from "@/components/ui/theme";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Factura",
  description: "Gestion de factures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ChakraProvider value={themeSystem}>{children}</ChakraProvider>
      </body>
    </html>
  );
}

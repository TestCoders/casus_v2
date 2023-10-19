import "@/app/globals.css";

import {type ReactNode} from "react";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster"
import {Header} from "@/components/layout/header";
import {cn} from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TestCoders automation casus",
  description: "Automate everything",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
    authors: [{name: "Marcel Blijleven"}]
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(`font-sans ${inter.variable}`)}>
      <Header />
      <main className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b p-2 lg:px-4 from-gray-800 to-gray-600 text-white">
          {children}
      </main>
      <Toaster />
      </body>
    </html>
  );
}

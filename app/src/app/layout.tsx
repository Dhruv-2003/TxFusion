import "./globals.css";
import { type ReactNode } from "react";
import { Figtree } from "next/font/google";

import { Providers } from "./providers";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compound Supplier",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <div>
            <Navbar />
          </div>
          <div>{props.children}</div>
        </Providers>
      </body>
    </html>
  );
}

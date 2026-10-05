import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

/** Editorial serif for display type: bold roman for names, italic for the gold emphasis. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Geometric sans for body copy and the wide-tracked uppercase labels. */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

/** Tints mobile browser chrome and keeps native controls dark. */
export const viewport: Viewport = {
  themeColor: "#12384b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "Gatio — Research & Insights",
    template: "%s · Gatio",
  },
  description: "[AGENCY POSITIONING]",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg">{children}</body>
    </html>
  );
}

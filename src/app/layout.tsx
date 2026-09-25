import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gatio — Research & Insights",
    template: "%s · Gatio",
  },
  description: "[AGENCY POSITIONING]",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrumentSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}

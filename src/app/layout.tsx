import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LakshmanPadma – Event Studio",
  description: "Where Every Celebration Becomes a Legend. Luxury Event Studio in Kurnool, Andhra Pradesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

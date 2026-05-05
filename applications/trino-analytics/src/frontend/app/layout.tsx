import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trino Analytics",
  description: "Local UI shell for Trino (Docker Compose)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

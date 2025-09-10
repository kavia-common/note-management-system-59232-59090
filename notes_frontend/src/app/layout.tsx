import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes App",
  description: "A simple, fast notes app built with Next.js",
  applicationName: "Notes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Notes App",
    description: "Create, edit, and manage notes easily.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen">
        {children}
      </body>
    </html>
  );
}

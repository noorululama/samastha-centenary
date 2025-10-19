import type { Metadata } from "next";
import { Noto_Sans_Malayalam } from "next/font/google";
import "./globals.css";

const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-malayalam",
});

export const metadata: Metadata = {
  title: "സമസ്ത നൂറാം വാർഷികം - Volunteer Registration",
  description: "Register for സമസ്ത നൂറാം വാർഷികം volunteer service",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ml" className={notoSansMalayalam.variable}>
      <body className="antialiased font-malayalam">
        {children}
      </body>
    </html>
  );
}

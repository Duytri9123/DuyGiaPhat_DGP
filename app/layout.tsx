import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/layout/LayoutClient";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Duy Gia Phát - Thiết bị điện công nghiệp",
  description: "Chuyên cung cấp thiết bị điện công nghiệp và giải pháp tự động hóa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-noto-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-300">
        <ThemeProvider>
          <LayoutClient>{children}</LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}

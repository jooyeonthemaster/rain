import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "장마향 - 당신의 장마를 향기로",
  description: "비 오는 날의 감성을 담은 향수 추천 서비스",
  openGraph: {
    title: "장마향 - 당신의 장마를 향기로",
    description: "비 오는 날의 감성을 담은 향수 추천 서비스",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

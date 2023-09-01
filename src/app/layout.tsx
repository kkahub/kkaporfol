import "../styles/globals.scss";
import type { Metadata } from "next";
import Header from "../components/layout/header";

export const metadata: Metadata = {
  title: "프론트엔드 개발자 김근애 포트폴리오",
  description: "김근애의 프론트엔드 개발, 웹퍼블리싱 포트폴리오 사이트입니다.",
  viewport: "initial-scale=1.0, width=device-width",
  authors: [{ name: "김근애", url: "https://kkaporfol.github.io/" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

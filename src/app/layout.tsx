import "../styles/globals.scss";
import { Metadata } from "next";

import GoogleAnalytics from "@components/googleAnalytics";
import Header from "@components/layout/Header";
import Providers from "@modules/provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://kkahub.github.io/kkaporfol"),
  title: "프론트엔드 개발자 김근애 포트폴리오",
  description: "김근애의 프론트엔드 개발, 웹퍼블리싱 포트폴리오 사이트입니다.",
  authors: [{ name: "김근애", url: "https://kkahub.github.io/kkaporfol" }],
  keywords: [
    "프론트엔드 개발자",
    "포트폴리오",
    "Next.js",
    "React",
    "JavaScript",
  ],
  generator: "Next.js",
  openGraph: {
    title: "KKA Front-end Developer Portfolio",
    description:
      "김근애의 프론트엔드 개발, 웹퍼블리싱 포트폴리오 사이트입니다.",
    url: "/",
    siteName: "프론트엔드 개발자 김근애 포트폴리오",
    images: [{ url: "/images/visual_bg1_m.jpg" }],
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <GoogleAnalytics />
      <body>
        <Providers>
          <Header />
          <div id="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

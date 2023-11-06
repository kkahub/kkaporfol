import { Metadata } from "next";
import Intro from "./intro/page";

export const metadata: Metadata = {
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
    url: "https://kkahub.github.io/kkaporfol",
    siteName: "프론트엔드 개발자 김근애 포트폴리오",
    images: [
      { url: "https://kkahub.github.io/kkaporfol/images/visual_bg1_m.jpg" },
    ],
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout() {
  return <Intro />;
}

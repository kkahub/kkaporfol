"use client";

import React from "react";
import "../styles/globals.scss";
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import { usePathname } from "next/navigation";
import Providers from "@modules/provider";

export const metadata: Metadata = {
  title: "프론트엔드 개발자 김근애 포트폴리오",
  description: "김근애의 프론트엔드 개발, 웹퍼블리싱 포트폴리오 사이트입니다.",
  authors: [{ name: "김근애", url: "https://kkahub.github.io/kkaporfol" }],
  openGraph: {
    type: "website",
    title: "KKA Front-end Developer Portfolio",
    description:
      "김근애의 프론트엔드 개발, 웹퍼블리싱 포트폴리오 사이트입니다.",
    url: "https://kkahub.github.io/kkaporfol",
    siteName: "프론트엔드 개발자 김근애 포트폴리오",
    images: [
      { url: "https://kkahub.github.io/kkaporfol/images/visual_bg1_m.jpg" },
    ],
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="ko">
      <body className={pathname === "/" ? "main" : ""}>
        <Providers>
          <Header />
          <div id="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

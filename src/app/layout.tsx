"use client";

import "../styles/globals.scss";
import { usePathname } from "next/navigation";
import Header from "@components/layout/Header";
import Providers from "@modules/provider";
import GoogleAnalytics from "@components/googleAnalytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="ko">
      <GoogleAnalytics />
      <body className={pathname === "/" ? "main" : ""}>
        <Providers>
          <Header />
          <div id="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

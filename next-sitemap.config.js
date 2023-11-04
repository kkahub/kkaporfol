/** @type {import('next-sitemap').IConfig} */

const config = {
  // 웹사이트의 기본 URL
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://kkahub.github.io/kkaporfol",
  // 파일을 생성 robots.txt하고 생성된 사이트맵을 나열 (기본 false)
  generateRobotsTxt: true,
  outDir: "./out",
  // 사이트맵 크기를 지정하여 큰 사이트맵을 여러 파일로 분할 (기본 5000)
  sitemapSize: 7000,
  // 페이지 주소 변경 빈도 (검색엔진에 제공) : always, daily, hourly, monthly, never, weekly, yearly
  changefreq: "daily",
  // 우선사항 (기본 0.7)
  priority: 1,
  // sitemap 등록 제외
  exclude: [
    "/ignore-pages/page", // 페이지 하나만 제외
    "/ignore-pages/**", // 하위 페이지 전체 제외
  ],
  robotsTxtOptions: {
    // 정책 설정
    policies: [
      {
        // 모든 agent 허용
        userAgent: "*",
        // 모든 페이지 주소 크롤링 허용
        allow: "/",
        // 크롤링 제외
        disallow: ["/ignore-pages"],
      },
      {
        // Google robots
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api*/"],
      },
      {
        // Naver robots
        userAgent: "Yeti",
        allow: "/",
        disallow: ["/api*/"],
      },
    ],
  },
};

export default config;

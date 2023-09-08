/** @type {import('next').NextConfig} */
const path = require("path");
const debug = process.env.NODE_ENV !== "production";
const repository = "https://kkahub.github.io/kkaporfol";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  images: { unoptimized: true },
  // basePath: "/kkaporfol", // 빌드 시 오픈
  assetPrefix: !debug ? `${repository}/` : "", // production 일때 prefix 경로
  // trailingSlash: true, //  빌드 시 폴더 구조 동일
  output: "export",
};

module.exports = nextConfig;

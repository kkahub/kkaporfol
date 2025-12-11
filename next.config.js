/* eslint no-underscore-dangle: 0 */
/** @type {import('next').NextConfig} */
import path from "path";

import withBundleAnalyzer from '@next/bundle-analyzer';

const __dirname = path.resolve();
const debug = process.env.NODE_ENV !== "production";
const repository = "https://kkahub.github.io/kkaporfol";

// 빌드 환경 체크
const getBuildConfig = (phase) => {
  return {
    isDevLocal: 
      phase === 'phase-development-server',
    isDevServer:
      process.env.PROD === 'false' &&
      (phase === 'phase-production-build' || phase === 'phase-production-server'),
    isProdServer:
      process.env.PROD === 'true' &&
      (phase === 'phase-production-build' || phase === 'phase-production-server'),
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  const { isDevLocal, isDevServer } = getBuildConfig(phase);
  const CURRENT_ENV = isDevLocal ? 'local' : isDevServer ? 'development' : 'production';

  return {
    reactStrictMode: false,
    productionBrowserSourceMaps: true,
    webpack: (config, { dev }) => {
      if (dev) {
        const styleRules = config.module.rules.find(rule =>
          rule.oneOf?.find(oneOf => oneOf.use?.includes?.('sass-loader')),
        );

        if (styleRules) {
          const sassLoader = styleRules.oneOf.find(oneOf =>
            oneOf.use?.includes?.('sass-loader'),
          );

          if (sassLoader) {
            const sassLoaderIndex = sassLoader.use.findIndex(use =>
              use.loader?.includes('sass-loader'),
            );

            if (sassLoaderIndex > -1) {
              sassLoader.use[sassLoaderIndex].options = {
                ...sassLoader.use[sassLoaderIndex].options,
                sourceMap: true,
              };
            }
          }
        }
      }
      return config;
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "src/styles")],
    },
    images: { 
      unoptimized: true,
      domains: ["https://kkahub.github.io/kkaporfol"],
      minimumCacheTTL: 31536000 
    },
    env: {
      NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
      CURRENT_ENV,
    },
    basePath: !debug ? "/kkaporfol" : "", // 빌드 시 경로 : 데브 시 경로
    assetPrefix: !debug ? `${repository}/` : "", // production 일때 prefix 경로
    // trailingSlash: true, //  빌드 시 폴더 구조 동일
    output: "export",
    cacheComponents: false,
    turbopack: {},
  }
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const defaultExport = (phase) => bundleAnalyzer(nextConfig(phase));
export default defaultExport;

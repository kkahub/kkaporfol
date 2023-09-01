/** @type {import('next').NextConfig} */
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData:
      "@import 'src/styles/_variables.scss'; @import 'src/styles/_mixins.scss'; @import 'src/styles/_fonts.scss'; @import 'src/styles/_reset.scss';",
  },
};

module.exports = nextConfig;

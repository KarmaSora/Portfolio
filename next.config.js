/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,

  // Enable static export for GitHub Pages deployment
  output: "export",

  // Required for GitHub Pages - adds trailing slashes to URLs
  trailingSlash: true,

  // Base path for GitHub Pages deployment (repo name)
  basePath: isProd ? '/Portfolio' : '',
  assetPrefix: isProd ? '/Portfolio/' : '',

  // Disable image optimization for static export (GitHub Pages doesn't support it)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

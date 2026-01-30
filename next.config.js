/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable static export for GitHub Pages deployment
  output: "export",

  // Required for GitHub Pages - adds trailing slashes to URLs
  trailingSlash: true,

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

  // Uncomment and set these if deploying to a subpath (e.g., username.github.io/repo-name)
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

module.exports = nextConfig;

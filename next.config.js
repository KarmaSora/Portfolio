/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? '/Portfolio' : '')).replace(/\/+$/, '');

const nextConfig = {
  reactStrictMode: true,

  // Enable static export for GitHub Pages deployment
  output: "export",

  // Required for GitHub Pages - adds trailing slashes to URLs
  trailingSlash: true,

  // GitHub Pages uses /Portfolio; a dedicated subdomain uses an empty prefix.
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  // Keep manually constructed asset URLs consistent with Next's routing.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

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

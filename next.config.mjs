/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/portfolio" : ""
  },
  trailingSlash: true,
  basePath: isGithubPages ? "/portfolio" : "",
  assetPrefix: isGithubPages ? "/portfolio/" : undefined,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  }
};

export default nextConfig;

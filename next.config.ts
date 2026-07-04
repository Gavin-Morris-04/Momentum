import type { NextConfig } from "next";
import path from "path";

/** Set in CI when deploying to github.io/<repo-name>/ */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/Momentum";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? repoBasePath : "",
  assetPrefix: isGithubPages ? `${repoBasePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;

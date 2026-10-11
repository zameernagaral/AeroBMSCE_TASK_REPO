/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isGitHubActions ? '/AeroBMSCE_TASK_REPO' : '',
  trailingSlash: true,
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
  },
};

export default nextConfig;

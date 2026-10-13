/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  ...(isGitHubActions
    ? {
        output: 'export',
        basePath: '/AeroBMSCE_TASK_REPO',
        trailingSlash: true,
      }
    : {
        async rewrites() {
          return [
            {
              source: '/api/:path*',
              destination: 'http://localhost:4000/api/:path*',
            },
          ];
        },
      }),
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
  },
};

export default nextConfig;

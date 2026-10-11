const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === 'true' ? '/AeroBMSCE_TASK_REPO' : '');

export default function imageLoader({ src }: { src: string }) {
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:')
  ) {
    return src;
  }
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  return `${basePath}${cleanSrc}`;
}

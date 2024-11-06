import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-0b0aef680a954379a6f490f89fcb43bf.r2.dev',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
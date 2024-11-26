import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.ulyadevelopment.site',
        port: '',
        pathname: '**',
      },
    ],
  },
  experimental: { serverComponentsExternalPackages: ['@aws-sdk/s3-request-presigner', '@aws-sdk/client-s3'] }
};

export default withNextIntl(nextConfig);
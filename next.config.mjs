import { defineConfig } from 'next/config';

export default defineConfig({
  reactStrictMode: true,
  env: {
    AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
});
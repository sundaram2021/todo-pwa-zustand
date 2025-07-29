// next.config.ts
import withPWA from '@ducanh2912/next-pwa';


const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config if you have any
};

export default withPWA({
  dest: 'public',
  disable: isDev,
  register: true,
  sw: 'sw.js',
})(nextConfig);
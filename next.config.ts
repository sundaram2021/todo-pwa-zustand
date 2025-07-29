
// next.config.ts
import withPWA from 'next-pwa'

const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Other configs
}

export default withPWA({
  dest: 'public',
  disable: isDev, // disable PWA in development
  register: true,
  skipWaiting: true,
  sw: 'sw.js',
  ...nextConfig
})

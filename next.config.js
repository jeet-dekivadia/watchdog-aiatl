/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,             // Enables React's strict mode for development
  swcMinify: true,                   // Uses SWC for minification to speed up builds
  images: {
    domains: ['api.placeholder.com'], // Whitelisted domains for images
  },
}

module.exports = nextConfig;           // Export the configuration

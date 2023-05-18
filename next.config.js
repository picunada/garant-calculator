/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "querystring": require.resolve("querystring-es3"),
      "tls": require.resolve('tls'),
      "stream": require.resolve('stream')
    }
    return config
  }
}



module.exports = nextConfig

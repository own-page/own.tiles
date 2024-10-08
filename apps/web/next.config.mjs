/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: [
            {
              loader: '@svgr/webpack',
              options: {
                dimensions: false
              }
            }
          ],
          as: '*.js'
        }
      }
    }
  }
};

export default nextConfig;

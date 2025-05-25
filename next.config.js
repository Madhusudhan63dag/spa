/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',  // This enables static exports
    trailingSlash: true,
    images: {
        unoptimized: true,  // Required for static export
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sampoornarogya.com',
            }
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    reactStrictMode: true,
    swcMinify: true
};

module.exports = nextConfig;

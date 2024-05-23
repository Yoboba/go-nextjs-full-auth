/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
        {
            source: '/api/server/:path*',
            destination: 'http://localhost:7070/:path*',
        },
        ]
    },
}

module.exports = nextConfig

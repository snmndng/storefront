/** @type {import('next').NextConfig} */
const config = {
        images: {
                remotePatterns: [
                        {
                                hostname: "*",
                        },
                ],
        },
        experimental: {
                typedRoutes: false,
        },
        // Allow all hosts for Replit proxy compatibility
        async headers() {
                return [
                        {
                                source: '/:path*',
                                headers: [
                                        {
                                                key: 'Access-Control-Allow-Origin',
                                                value: '*',
                                        },
                                ],
                        },
                ];
        },
        // used in the Dockerfile
        output:
                process.env.NEXT_OUTPUT === "standalone"
                        ? "standalone"
                        : process.env.NEXT_OUTPUT === "export"
                          ? "export"
                          : undefined,
};

export default config;

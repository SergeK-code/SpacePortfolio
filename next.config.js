/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    return [
      {
        source: "/(.*)",
        headers: isDev
          ? [
              { key: "Cache-Control", value: "no-store" },
              { key: "Pragma", value: "no-cache" },
              { key: "Expires", value: "0" },
            ]
          : [
              {
                key: "Cache-Control",
                value: "public, max-age=3600, stale-while-revalidate=86400",
              },
            ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|webm|mp4)",
        headers: isDev
          ? [{ key: "Cache-Control", value: "no-store" }]
          : [
              {
                key: "Cache-Control",
                value: "public, max-age=86400, stale-while-revalidate=604800",
              },
            ],
      },
    ];
  },
};

module.exports = nextConfig;

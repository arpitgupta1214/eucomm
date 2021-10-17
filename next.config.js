const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/events-n-webinars/webinars",
      destination: "/resources/webinars",
      permanent: true,
    },
  ],
});

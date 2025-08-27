/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",         // when someone visits /
        destination: "/home", // send them to /home
        permanent: true,     // true = 308 permanent redirect
      },
    ];
  },
};

export default nextConfig;

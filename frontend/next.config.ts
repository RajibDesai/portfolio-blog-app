/** @type {import('next').NextConfig} */
const nextConfig = {
  // images কনফিগারেশনটি এখানে যোগ করুন
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // যেহেতু আপনি Cloudinary ব্যবহার করছেন, সেটির hostname-ও এখানে যোগ করে দিন
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
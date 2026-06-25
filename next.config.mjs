/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local placeholder assets live in /public. When you connect Supabase/Firebase
    // storage later, add the remote host here.
    // TODO: add remotePatterns for Supabase storage bucket, e.g.
    // remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

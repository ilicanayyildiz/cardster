import type { NextConfig } from "next";

// Derive Supabase host from env so Next/Image knows the exact hostname
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const remotePatterns = [
  { protocol: "https", hostname: "upload.wikimedia.org" },
  { protocol: "https", hostname: "commons.wikimedia.org" },
  // Supabase public storage host (project-specific)
  ...(supabaseHost ? [{ protocol: "https", hostname: supabaseHost }] : []),
  // Country flags CDN
  { protocol: "https", hostname: "flagcdn.com" },
] as const;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: remotePatterns as unknown as any,
  },
};

export default nextConfig;

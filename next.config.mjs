import nextra from "nextra";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: ""
            }
        ]
    }
};

const withNextra = nextra({
    theme: "nextra-theme-docs",
    themeConfig: "./theme.config.tsx"
});

export default withNextra(nextConfig);
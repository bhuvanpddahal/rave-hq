import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://rave-hq.vercel.app";

    return {
        rules: {
            userAgent: "*",
            allow: [
                "/",
                "/dashboard",
                "/testimonials",
                "/apps",
                "/settings",
                "/signin",
                "/docs/getting-started"
            ],
            disallow: []
        },
        sitemap: `${baseUrl}/sitemap.xml`
    };
}
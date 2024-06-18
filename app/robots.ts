import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

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
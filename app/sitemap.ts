import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://rave-hq.vercel.app";

    return [
        {
            url: baseUrl,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/dashboard`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/testimonials`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/apps`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/settings`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/signin`,
            lastModified: new Date()
        },
        {
            url: `${baseUrl}/docs/getting-started`,
            lastModified: new Date()
        }
    ];
}
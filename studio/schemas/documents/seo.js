import { SeoIconLarge } from "../styles/Icons";

export default {
    title: "SEO",
    name: "seo",
    type: "document",
    icon: SeoIconLarge,
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    fields: [
        {
            // Site Title
            title: "Site Title",
            name: "seoTitle",
            type: "string",
            description: "Appears in browser window & search engine results.",
            validation: (Rule) => [Rule.required().warning(`Your site needs a Title.`)],
        },
        {
            // Site Decription
            title: "Site Description",
            name: "seoDescription",
            type: "text",
            description: "Appears in search engine results.",
            validation: (Rule) => [
                Rule.required().warning(`Your site needs a description.`),
                Rule.min(50).warning(`Your site description should be a minimum of 50 characters.`),
                Rule.max(155).warning(
                    `Your site description should be a maximum of 155 characters.`
                ),
            ],
        },
        {
            // Social Banner
            title: "SEO Image",
            name: "seoImage",
            type: "image",
            description:
                "Appears when website is shared on social media (Facebook, Twitter, LinkedIn, Slack etc.). Image will be cropped to 1200×630px",
        },
    ],
};

import { SeoIcon } from "../styles/Icons";

export default {
    title: "SEO",
    name: "seo",
    type: "document",
    icon: () => SeoIcon(),
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    fields: [
        {
            title: "Site Title",
            name: "seoTitle",
            type: "string",
            description: "Appears in search engine results.",
            validation: (Rule) => [Rule.required().warning(`Your site needs a Title.`)],
        },
        {
            title: "Site Acronym",
            name: "seoAcronym",
            type: "string",
            description: "Appears in browser tab.",
            validation: (Rule) => [Rule.required().warning(`Your site needs an Acronym.`)],
        },
        {
            title: "Site Description",
            name: "seoDescription",
            type: "text",
            rows: 3,
            description: "Appears in search engine results.",
            validation: (Rule) => [
                Rule.required().warning(`Your page needs an SEO description.`),
                Rule.min(50).warning(`Your page description should be a minimum of 50 characters.`),
                Rule.max(155).warning(
                    `Your page description should be a maximum of 155 characters.`
                ),
            ],
        },
        {
            title: "SEO Image",
            name: "seoImage",
            type: "image",
            description:
                "Appears when website is shared on social media (Facebook, Twitter, LinkedIn, Slack etc.). Image will be cropped to 1200×630px",
            validation: (Rule) => Rule.required().warning(`Your page needs an SEO image.`),
        },
    ],
};

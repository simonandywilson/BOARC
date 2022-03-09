import { isUniqueAcrossAllDocuments } from "../functions/isUniqueAcrossAllDocuments";
import ReferencedBy from "../components/reference/ReferencedBy";
import { DomesIconLarge } from "../styles/Icons";

export default {
    name: "domes",
    title: "Domes FM",
    type: "document",
    icon: DomesIconLarge,
    // __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
        },
        {
            name: "landing",
            title: "Landing",
        },
        {
            name: "seo",
            title: "SEO",
        },
    ],
    fields: [
        {
            name: "referringDocuments",
            title: "",
            type: "array",
            of: [{ type: "menu" }],
            readOnly: true,
            inputComponent: ReferencedBy,
            group: "content",
        },
        {
            name: "referring",
            title: "Referring",
            type: "string",
            readOnly: true,
            group: "content",
            hidden: true,
        },
        {
            name: "landing",
            title: "Landing",
            type: "boolean",
            readOnly: true,
            group: "content",
            initialValue: false,
            hidden: true,
        },
        {
            name: "homepage",
            title: "Homepage",
            type: "boolean",
            readOnly: true,
            group: "content",
            initialValue: false,
            hidden: true,
        },
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "content",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            description: "bidstonobservatory.org/",
            group: "content",
            options: {
                source: "title",
                basePath: "bidstonobservatory.org/",
                isUnique: isUniqueAcrossAllDocuments,
                maxLength: 30,
            },
            validation: (Rule) => [Rule.required().error(`Please enter a slug.`)],
        },
        {
            name: "content",
            title: "Content",
            type: "pageBlock",
            group: "content",
        },
        {
            name: "landingTitle",
            title: "Landing Title",
            type: "string",
            group: "landing",
            hidden: ({ parent }) => !parent?.landing,
        },
        {
            name: "landingTitlePosition",
            title: "Landing Title Position",
            type: "number",
            group: "landing",
            description: "Choose a column number for the landing page title.",
            hidden: ({ parent }) => !parent?.landing,
            initialValue: 1,
            validation: (Rule) => [
                Rule.required().error(`Please enter a column number.`),
                Rule.min(1).error(`Please choose a column number bigger than 1.`),
                Rule.max(45).error(`Please choose a column number smaller than 45.`),
            ],
        },
        {
            name: "landingDescription",
            title: "Landing Description",
            type: "string",
            group: "landing",
            hidden: ({ parent }) => !parent?.landing,
        },
        {
            name: "landingDescriptionPosition",
            title: "Landing Description Position",
            type: "number",
            group: "landing",
            description: "Choose a column number for the landing page description.",
            hidden: ({ parent }) => !parent?.landing,
            initialValue: 1,
            validation: (Rule) => [
                Rule.required().error(`Please enter a column number.`),
                Rule.min(1).error(`Please choose a column number bigger than 1.`),
                Rule.max(45).error(`Please choose a column number smaller than 45.`),
            ],
        },
        {
            title: "SEO Description",
            name: "seoDescription",
            type: "text",
            description: "Appears in search engine results.",
            group: "seo",
            validation: (Rule) => [
                Rule.required().warning(`Your page needs a description.`),
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
                "Appears when page is shared on social media (Facebook, Twitter, LinkedIn, Slack etc.). Image will be cropped to 1200×630px",
            group: "seo",
        },
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare(selection) {
            const { title } = selection;
            return {
                title: title ? title : "Domes FM",
                media: DomesIconLarge,
            };
        },
    },
};

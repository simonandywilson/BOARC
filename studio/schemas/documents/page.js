import { isUniqueAcrossAllDocuments } from "../functions/isUniqueAcrossAllDocuments";
import ReferencedBy from "../components/reference/ReferencedBy";
import RenderColourSimple from "../components/colour/RenderColourSimple";
import RenderSingleLanding from "../components/landing/RenderSingleLanding";
import RenderReadingTime from "../components/reading/RenderReadingTime";

import { PageIcon, HomeIcon } from "../styles/Icons";

export default {
    name: "page",
    title: "Pages",
    icon: () => PageIcon(),
    type: "document",
    fieldsets: [
        {
            name: "landing",
            title: "Landing Options",
            description: "Choose how this page is displayed on its landing page, if applicable.",
            options: {
                collapsible: false,
                columns: 2,
            },
            hidden: ({ document }) => {
                const referringTypes = document.referring
                    ? document.referring.map((a) => a.type)
                    : [];

                if (referringTypes.includes("landing")) {
                    return false;
                } else {
                    return true;
                }
            },
        },
        {
            name: "gradient",
            title: "Background Colour",
            description: `This tool uses the Web Content Accessibility Guidelines’s formula for colour
                        contrast to compare the text colour to the background colour(s) you select. Aim
                        to choose a background that passes level AA for both regular and
                        large text sizes.`,
            options: {
                collapsible: false,
                columns: 2,
            },
        },
    ],
    groups: [
        {
            name: "content",
            title: "Content",
            default: true,
        },
        {
            name: "landing",
            title: "Landing",
            hidden: ({ document }) => {
                const referringTypes = document.referring
                    ? document.referring.map((a) => a.type)
                    : [];

                if (referringTypes.includes("landing")) {
                    return false;
                } else {
                    return true;
                }
            },
        },
        {
            name: "customisation",
            title: "Customisation",
        },
        {
            name: "seo",
            title: "SEO",
        },
    ],
    fields: [
        {
            name: "referring",
            title: "",
            type: "array",
            of: [{ type: "ref" }],
            readOnly: false,
            inputComponent: ReferencedBy,
            options: { source: "referring", forward: { to: "menu", filter: "menu" } },
            group: "content",
        },
        {
            name: "menu",
            title: "Menu",
            type: "string",
            group: "content",
            hidden: true,
            readOnly: true,
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
            name: "reading",
            title: "Reading Time",
            type: "string",
            readOnly: false,
            group: "content",
            inputComponent: RenderReadingTime,
            options: { fieldName: "reading", target: "content" },
        },
        {
            name: "landingDescription",
            title: "Description",
            description: "Used on landing page, if applicable.",
            type: "string",
            group: "landing",
            hidden: ({ document }) => {
                const referringTypes = document.referring
                    ? document.referring.map((a) => a.type)
                    : [];

                if (referringTypes.includes("landing")) {
                    return false;
                } else {
                    return true;
                }
            },
        },
        {
            name: "landingTitlePosition",
            title: "Title Position",
            type: "number",
            fieldset: "landing",
            group: "landing",
            initialValue: 1,
            validation: (Rule) => [
                Rule.required().error(`Please enter a column number.`),
                Rule.min(1).error(`Please choose a column number bigger than 1.`),
                Rule.max(45).error(`Please choose a column number smaller than 45.`),
            ],
        },

        {
            name: "landingDescriptionPosition",
            title: "Description Position",
            type: "number",
            fieldset: "landing",
            group: "landing",
            initialValue: 1,
            validation: (Rule) => [
                Rule.required().error(`Please enter a column number.`),
                Rule.min(1).error(`Please choose a column number bigger than 1.`),
                Rule.max(45).error(`Please choose a column number smaller than 45.`),
            ],
        },
        {
            name: "landingPreview",
            title: "Landing Preview",
            type: "string",
            readOnly: true,
            group: "landing",
            inputComponent: RenderSingleLanding,
            hidden: ({ document }) => {
                const referringTypes = document.referring
                    ? document.referring.map((a) => a.type)
                    : [];

                if (referringTypes.includes("landing")) {
                    return false;
                } else {
                    return true;
                }
            },
        },
        {
            name: "width",
            title: "Content Width",
            type: "string",
            options: {
                list: [
                    { title: "Normal", value: "normal" },
                    { title: "Wide", value: "wide" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "normal",
            group: "customisation",
        },
        {
            name: "ascii",
            title: "Ascii Banner",
            type: "string",
            options: {
                list: [
                    { title: "Hidden", value: "false" },
                    { title: "Visible", value: "true" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "false",
            group: "customisation",
        },
        {
            name: "text",
            title: "Text Colour",
            type: "colorlist",
            group: "customisation",
            options: {
                list: [
                    { title: "Brown", value: "#786A2F" },
                    { title: "Black", value: "#000000" },
                    { title: "White", value: "#ffffff" },
                ],
                borderradius: {
                    inner: "100%",
                    outer: "20%",
                },
                tooltip: true,
                darken: 20,
            },
            initialValue: { title: "Brown", value: "#786A2F" },
        },
        {
            name: "backgroundLeft",
            title: "Left Colour",
            type: "string",
            group: "customisation",
            inputComponent: RenderColourSimple,
            fieldset: "gradient",
            options: {
                defaultColour: "#ffffff",
            },
        },
        {
            name: "backgroundRight",
            title: "Right Colour",
            type: "string",
            group: "customisation",
            inputComponent: RenderColourSimple,
            fieldset: "gradient",
            options: {
                defaultColour: "#ffffff",
            },
        },
        {
            title: "SEO Description",
            name: "seoDescription",
            type: "text",
            description: "Appears in search engine results.",
            group: "seo",
            rows: 3,
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
                "Appears when page is shared on social media (Facebook, Twitter, LinkedIn, Slack etc.). Image will be cropped to 1200×630px",
            group: "seo",
            validation: (Rule) => [Rule.required().warning(`Your page needs an SEO image.`)],
        },
    ],
    orderings: [
        {
            title: "Menu",
            name: "menuOrdering",
            by: [{ field: "menu", direction: "asc" }],
        },
        {
            title: "Title",
            name: "titleOrdering",
            by: [{ field: "title", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            referring: "referring",
            menu: "menu",
        },
        prepare(selection) {
            const { title, referring, menu } = selection;
            const referringTypes = referring ? referring.map((a) => a.type) : [];
            return {
                title: title ? title : "Untitled Page",
                media: referringTypes.includes("homepage") ? () => HomeIcon() : () => PageIcon(),
                subtitle: menu ?? menu,
            };
        },
    },
};

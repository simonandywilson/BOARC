import { isUniqueAcrossAllDocuments } from "../functions/isUniqueAcrossAllDocuments";
import ReferencedBy from "../components/reference/ReferencedBy";
import RenderColourSimple from "../components/colour/RenderColourSimple";
import RenderSingleLanding from "../components/landing/RenderSingleLanding";
import RenderReadingTime from "../components/reading/RenderReadingTime";

import { PageIconLarge, HomeIconLarge } from "../styles/Icons";

export default {
    name: "page",
    title: "Pages",
    icon: PageIconLarge,
    type: "document",
    fieldsets: [
        {
            name: "landing",
            title: "Landing Options",
            description: "Choose how this page is displayed on its landing page, if applicable.",
            options: {
                collapsible: false,
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
            name: "reading",
            title: "Reading Time",
            type: "string",
            readOnly: false,
            group: "content",
            inputComponent: RenderReadingTime,
            options: { fieldName: "reading", target: "content" },
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
            fieldset: "landing",
            group: "landing",
        },
        {
            name: "landingTitlePosition",
            title: "Landing Title Position",
            type: "number",
            fieldset: "landing",
            group: "landing",
            description: "Choose a column number for the landing page title.",
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
            fieldset: "landing",
            group: "landing",
        },
        {
            name: "landingDescriptionPosition",
            title: "Landing Description Position",
            type: "number",
            fieldset: "landing",
            group: "landing",
            description: "Choose a column number for the landing page description.",
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
            name: "images",
            title: "Background Images",
            type: "array",
            group: "customisation",
            of: [{ type: "image" }],
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
    orderings: [
        {
            title: "Menu",
            name: "menuAsc",
            by: [{ field: "referring", direction: "asc" }],
        },
        {
            title: "Title",
            name: "titleAsc",
            by: [{ field: "title", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            referring: "referring",
            homepage: "homepage",
        },
        prepare(selection) {
            const { title, referring, homepage } = selection;
            return {
                title: title ? title : "Untitled Page",
                media: homepage ? HomeIconLarge : PageIconLarge,
                subtitle: referring ?? referring,
            };
        },
    },
};

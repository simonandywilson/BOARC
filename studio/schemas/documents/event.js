import { isUniqueAcrossAllDocuments } from "../functions/isUniqueAcrossAllDocuments";
import RenderColour from "../components/colour/RenderColour";
import { EventsIconLarge } from "../styles/Icons";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

export default {
    name: "event",
    title: "Events",
    icon: EventsIconLarge,
    type: "document",
    groups: [
        {
            name: "preview",
            title: "Preview",
            default: true,
        },
        {
            name: "content",
            title: "Content",
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
            name: "eventParent",
            title: "Parent",
            type: "reference",
            to: [{ type: "page" }],
            initialValue: { _ref: "2b61b9b3-5f4d-4f9e-aca0-36e6043166ec" },
            group: "preview",
            options: { disableNew: true },
            validation: (Rule) => Rule.required().error(`Please select a parent page.`),
        },
        {
            name: "title",
            title: "Title",
            type: "string",
            group: "preview",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            description: "bidstonobservatory.org/",
            group: "preview",
            options: {
                isHighlighted: true,
                source: async (doc) => {
                    const query = "*[_id == $parentId] {'slug': slug.current}";
                    const params = { parentId: doc.eventParent._ref };
                    const parent = await client.fetch(query, params);
                    const slug = `${parent[0].slug}/${doc.title}`;
                    return slug.replace(/\.[^/.]+$/, "");
                },
                slugify: (input) => input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
                isUnique: isUniqueAcrossAllDocuments,
                maxLength: 30,
            },
            validation: (Rule) => Rule.required().error(`Please enter a slug.`),
        },
        {
            title: "Event Start",
            name: "start",
            type: "datetime",
            group: "preview",
            options: {
                dateFormat: "D MMM YYYY",
                timeFormat: "HH:mm",
                timeStep: 15,
                calendarTodayLabel: "Today",
            },
            validation: (Rule) => Rule.required().error(`Please enter a start date.`),
        },
        // {
        //     title: "Event End",
        //     name: "end",
        //     type: "datetime",
        //     group: "preview",
        //     options: {
        //         dateFormat: "D MMM YYYY",
        //         timeFormat: "HH:mm",
        //         timeStep: 15,
        //         calendarTodayLabel: "Today",
        //     },
        //     validation: (Rule) => Rule.required().error(`Please enter a end date.`),
        // },
        {
            name: "icon",
            title: "Icon",
            type: "image",
            description:
                "Icon will be cropped to a square. After uploading/selecting an image, click the pencil icon to choose a crop and hotspot.",
            group: "preview",
            options: {
                hotspot: true,
            },
        },
        {
            name: "previewText",
            title: "Preview Text",
            type: "text",
            group: "preview",
        },

        {
            name: "banner",
            title: "Banner",
            type: "image",
            group: "content",
            options: {
                hotspot: true,
            },
        },
        {
            name: "programme",
            title: "Programme",
            type: "eventBlock",
            group: "content",
        },
        {
            name: "description",
            title: "Description",
            type: "eventBlock",
            group: "content",
        },
        {
            name: "text",
            title: "Text Colour",
            type: "colorlist",
            group: "customisation",
            options: {
                list: [
                    { title: "Brown", value: "#786A2F" },
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
            name: "background",
            title: "Background Colour",
            type: "string",
            group: "customisation",
            inputComponent: RenderColour,
            options: {
                defaultColour: "#f2ff8e",
            },
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
            title: "Event Date, New",
            name: "dateDesc",
            by: [{ field: "start", direction: "desc" }],
        },
        {
            title: "Event Date, Old",
            name: "dateAsc",
            by: [{ field: "start", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "start",
            media: "icon",
        },
        prepare(selection) {
            const { title, subtitle, media } = selection;
            const date = new Date(subtitle);
            return {
                title: title ? title : "Untitled Event",
                media: media ?? EventsIconLarge,
                subtitle: subtitle && date.toLocaleDateString("en-GB"),
            };
        },
    },
};

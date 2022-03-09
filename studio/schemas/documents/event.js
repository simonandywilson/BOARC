import { isUniqueAcrossAllDocuments } from "../functions/isUniqueAcrossAllDocuments";
import RenderColour from "../components/colour/RenderColour";
import { EventsIconLarge } from "../styles/Icons";

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
            name: "details",
            title: "Details",
        },
        {
            name: "seo",
            title: "SEO",
        },
    ],
    fields: [
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
                source: "title",
                basePath: "bidstonobservatory.org/",
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
                "Icon will be cropped to a square. Click the pencil icon to choose a crop and hotspot.",
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
            name: "background",
            title: "Background Colour",
            type: "string",
            group: "details",
            inputComponent: RenderColour,
        },
        {
            name: "banner",
            title: "Banner",
            type: "image",
            group: "details",
            options: {
                hotspot: true,
            },
        },
        {
            name: "programme",
            title: "Programme",
            type: "programmeBlock",
            group: "details",
        },
        {
            name: "description",
            title: "Description",
            type: "basicBlock",
            group: "details",
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

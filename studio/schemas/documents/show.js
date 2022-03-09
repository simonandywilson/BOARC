import { ShowIconLarge } from "../styles/Icons";

export default {
    name: "show",
    title: "Shows",
    icon: ShowIconLarge,
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "date",
            title: "Broadcast Date",
            type: "date",
            options: {
                dateFormat: "D MMM YYYY",
                calendarTodayLabel: "Today",
            },
        },
        {
            name: "icon",
            title: "Icon",
            type: "image",
            description:
                "Icon will be cropped to a square. Click the pencil icon to choose a crop and hotspot.",
            options: {
                hotspot: true,
            },
        },
        {
            name: "text",
            title: "Text",
            type: "programmeBlock",
        },

        {
            name: "audio",
            title: "Audio",
            type: "file",
        },
    ],
    orderings: [
        {
            title: "Broadcast Date, New",
            name: "dateDesc",
            by: [{ field: "date", direction: "desc" }],
        },
        {
            title: "Broadcast Date, Old",
            name: "dateAsc",
            by: [{ field: "date", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "icon",
            subtitle: "date",
        },
        prepare(selection) {
            const { title, subtitle, media } = selection;
            const date = new Date(subtitle);
            return {
                title: title ? title : "Show",
                media: media ?? ShowIconLarge,
                subtitle: subtitle && date.toLocaleDateString("en-GB"),
            };
        },
    },
};

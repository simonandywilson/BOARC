import { CommentsIconLarge } from "../styles/Icons";

export default {
    name: "comments",
    title: "Comments",
    icon: CommentsIconLarge,
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "message",
            title: "Message",
            type: "text",
            rows: 4
        },
        {
            title: "Published At",
            name: "publishedAt",
            type: "datetime",
            readOnly: true,
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "message",
        },
        // prepare(selection) {
        //     const { title, subtitle } = selection;
        //     const date = new Date(subtitle);
        //     return {
        //         title: title ?? "File",
        //         subtitle: subtitle && date.toLocaleDateString("en-GB"),
        //     };
        // },
    },
};

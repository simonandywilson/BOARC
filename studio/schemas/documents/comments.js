import { CommentsIconLarge, AllowedIconLarge, DisallowedIconLarge } from "../styles/Icons";

export default {
    name: "comments",
    title: "Comments",
    // icon: CommentsIconLarge,
    type: "document",
    fields: [
        {
            name: "visible",
            title: "Visible in Chat?",
            type: "boolean",
            initialValue: true
        },
        {
            name: "name",
            title: "Name",
            type: "string",
            readOnly: true,
        },
        {
            name: "message",
            title: "Message",
            type: "text",
            rows: 4,
            readOnly: true,
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
            title: "name",
            subtitle: "message",
            visible: "visible"
        },
        prepare(selection) {
            const { title, subtitle, visible } = selection;
            return {
                title: title ?? "Comment",
                subtitle: subtitle,
                media: visible ? AllowedIconLarge : DisallowedIconLarge
            };
        },
    },
};

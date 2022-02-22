import { IconsIconLarge } from "../styles/Icons";

export default {
    name: "icons",
    title: "Icons",
    icon: IconsIconLarge,
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            title: "Icon",
            name: "icon",
            type: "image",
        },
    ],
    preview: {
        select: {
            title: "name",
            media: "icon",
        },
        prepare(selection) {
            const { title, media } = selection;
            return {
                title: title ?? "Icon",
                media: media ?? IconsIconLarge,
            };
        },
    },
};

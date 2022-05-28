import { BackgroundIcon } from "../styles/Icons";

export default {
    name: "background",
    title: "Backgrounds",
    icon: () => BackgroundIcon(),
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required().error(`You need a title for your image.`),
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            validation: (Rule) => Rule.required().error(`You need an image.`),
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
        },
        prepare(selection) {
            const { title, media } = selection;
            return {
                title: title ?? "Background",
                media: media ?? (() => BackgroundIcon()),
            };
        },
    },
};

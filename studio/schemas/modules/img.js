import { ImgIcon } from "../styles/Icons";

export default {
    name: "img",
    title: "Image",
    type: "image",
    icon: () => ImgIcon(),
    options: {
        hotspot: true,
    },
    fields: [
        {
            title: "Alternative Text",
            name: "alt",
            type: "string",
            description: "Important for SEO and accessibility.",
            options: {
                isHighlighted: true,
            },
            validation: (Rule) => Rule.required().warning(`Image alt is required.`),
        },
    ],
    preview: {
        select: {
            media: "asset",
            subtitle: "alt",
        },
        prepare(selection) {
            const { media, subtitle } = selection;
            return {
                title: "Image",
                media: media ?? ImgIcon("small"),
                subtitle: subtitle && subtitle,
            };
        },
    },
};

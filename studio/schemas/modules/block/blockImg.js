import RenderBlockImg from "../../components/block/img/RenderBlockImg";
import { ImgIcon } from "../../styles/Icons";

export default {
    name: "blockImg",
    title: "Image",
    type: "image",
    icon: () => ImgIcon("small"),
    validation: (Rule) => Rule.required().error(`You need to add an image.`),
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
        {
            name: "caption",
            title: "Caption",
            type: "basicBlock",
            options: {
                isHighlighted: true,
            },
        },
    ],
    preview: {
        select: {
            media: "asset",
            caption: "caption",
            alt: "alt",
        },
        component: RenderBlockImg,
    },
};

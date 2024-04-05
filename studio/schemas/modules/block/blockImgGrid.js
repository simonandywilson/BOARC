import { ImgGridIcon } from "../../styles/Icons";
import RenderBlockGrid from "../../components/block/grid/RenderBlockGrid";

export default {
    name: "blockImgGrid",
    title: "Image Grid",
    type: "object",
    icon: () => ImgGridIcon("small"),
    fields: [
        {
            title: "Presentation",
            name: "type",
            type: "string",
            description: "Choose whether images in grid are tinted in brown.",
            options: {
                list: [
                    { title: "Tinted", value: "tinted" },
                    { title: "Clear", value: "clear" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "tinted",
        },
        {
            name: "image",
            title: "Image",
            type: "array",
            of: [{ type: "img" }],
        },
    ],
    preview: {
        select: {
            content: "image",
        },
        component: RenderBlockGrid,
    },
};

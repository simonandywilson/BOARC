import { ImgGridIcon, ImgGridIconLarge } from "../../styles/Icons";
import RenderBlockGrid from "../../components/block/grid/RenderBlockGrid";

export default {
    name: "blockImgGrid",
    title: "Image Grid",
    type: "object",
    icon: ImgGridIcon,
    fields: [
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

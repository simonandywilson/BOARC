import { CarouselIcon, CarouselIconLarge } from "../../styles/Icons";
import RenderBlockCarousel from "../../components/block/carousel/RenderBlockCarousel";


export default {
    name: "blockCarousel",
    title: "Carousel",
    type: "object",
    icon: CarouselIcon,
    fields: [
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "img" }],
        },
    ],
    preview: {
        select: {
            content: "content",
        },
        component: RenderBlockCarousel,
    },
};

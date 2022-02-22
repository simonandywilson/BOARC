import { CarouselIcon, CarouselIconLarge } from "../../styles/Icons";

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
        prepare(selection) {
            const { content } = selection;
            return {
                title: content ? "Carousel" : "Empty Carousel",
                media: content ? content[0] : CarouselIconLarge,
            };
        },
    },
};

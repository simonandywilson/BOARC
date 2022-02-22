import { CollapsibleIcon } from "../../styles/Icons";

export default {
    name: "blockCollapsible",
    title: "Collapsible",
    type: "object",
    icon: CollapsibleIcon,
    fields: [
        {
            name: "type",
            title: "Type",
            type: "string",
            options: {
                list: [
                    { title: "Simple", value: "simple" },
                    { title: "Featured", value: "featured" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "simple",
        },
        {
            name: "title",
            title: "Title",
            type: "string",
        },
    ],
    // preview: {
    //     select: {
    //         title: "title",
    //     },
    //     prepare(selection) {
    //         const { content } = selection;
    //         return {
    //             title: content ? "Carousel" : "Empty Carousel",
    //             media: content ? content[0] : carouselIconPreview,
    //         };
    //     },
    // },
};

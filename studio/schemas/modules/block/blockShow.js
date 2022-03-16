import { ShowIcon, ShowIconLarge } from "../../styles/Icons";

import RenderHeading from "../../components/heading/RenderHeading";

export default {
    name: "blockShow",
    title: "Shows",
    type: "object",
    icon: ShowIcon,
    fields: [
        {
            name: "heading",
            title: "Heading",
            type: "string",
        },
        {
            name: "border",
            title: "Border",
            type: "reference",
            to: [{ type: "borders" }],
        },
        {
            name: "headingPreview",
            title: "Heading Preview",
            type: "string",
            inputComponent: RenderHeading,
        },
    ],
    preview: {
        select: {
            heading: "heading",
        },
        prepare(selection) {
            const { heading } = selection;
            return {
                title: heading ? heading : "Shows",
                media: ShowIconLarge,
            };
        },
    },
};

import RenderHeading from "../../components/heading/RenderHeading";
import RenderBlockHeading from "../../components/block/heading/RenderBlockHeading";

import { HeadingIcon } from "../../styles/Icons";

export default {
    name: "blockHeading",
    title: "Heading",
    type: "object",
    icon: HeadingIcon,
    fields: [
        {
            name: "heading",
            title: "Text",
            type: "string",
            validation: (Rule) => Rule.required().error(`Your heading needs some text.`),
        },
        {
            name: "border",
            title: "Border",
            type: "reference",
            to: [{ type: "borders" }],
            validation: (Rule) => Rule.required().error(`Your heading needs a border.`),
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
            border: "border",
        },
        component: RenderBlockHeading,
    },
};

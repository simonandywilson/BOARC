import RenderHeading from "../../components/heading/RenderHeading";
import RenderBlockHeading from "../../components/block/heading/RenderBlockHeading";

import { HeadingIcon } from "../../styles/Icons";

export default {
    name: "blockHeading",
    title: "Heading",
    type: "object",
    icon: () => HeadingIcon("small"),
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
            name: "colour",
            title: "Colour",
            type: "colorlist",
            options: {
                list: [
                    { title: "Black", value: "#000000" },
                    { title: "Red", value: "#ed6b6c" },
                ],
                borderradius: {
                    inner: "100%",
                    outer: "20%",
                },
                tooltip: true,
                darken: 20,
            },
            initialValue: { title: "Black", value: "#000000" },
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
            colour: "colour",
        },
        component: RenderBlockHeading,
    },
};

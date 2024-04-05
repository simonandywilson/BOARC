import RenderBlockBackground from "../../components/block/background/RenderBlockBackground";
import { BackgroundIcon } from "../../styles/Icons";

export default {
    name: "blockBackground",
    title: "Background Image",
    type: "object",
    icon: () => BackgroundIcon("small"),
    fields: [
        {
            name: "reference",
            title: "Reference to Background Image:",
            type: "reference",
            to: [{ type: "background" }],
        },
        {
            name: "position",
            title: "Position",
            type: "string",
            options: {
                list: [
                    { title: "Left", value: "left" },
                    { title: "Right", value: "right" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "left",
        },
    ],
    preview: {
        select: {
            reference: "reference",
            position: "position",
        },
        component: RenderBlockBackground,
    },
};

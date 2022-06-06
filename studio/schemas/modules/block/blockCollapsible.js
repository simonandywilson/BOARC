import { CollapsibleIcon } from "../../styles/Icons";
import RenderBlockCollapsible from "../../components/block/collapsible/RenderBlockCollapsible";

export default {
    name: "blockCollapsible",
    title: "Collapsible",
    type: "object",
    icon: () => CollapsibleIcon("small"),
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
            name: "icon",
            title: "Reference to Icon:",
            type: "reference",
            to: [{ type: "icons" }],
            hidden: ({ parent }) => {
                if ("type" in parent) {
                    if (parent.type === "simple") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            },
        },
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "text",
            title: "Text",
            type: "collapsibleBlock",
        },
    ],
    preview: {
        select: {
            title: "title",
            icon: "icon",
            text: "text",
            type: "type"
        },
        component: RenderBlockCollapsible,
    },
};

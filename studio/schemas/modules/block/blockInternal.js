import RenderBlockInternalLink from "../../components/block/internal/RenderBlockInternalLink";
import { InternalIcon } from "../../styles/Icons";

export default {
    name: "blockInternal",
    title: "Internal Link",
    type: "object",
    icon: () => InternalIcon("small"),
    blockEditor: {
        icon: () => InternalIcon("small"),
        render: RenderBlockInternalLink,
    },
    fields: [
        {
            name: "reference",
            title: "Reference to Page:",
            type: "reference",
            to: [{ type: "page" }],
        },
    ],
};

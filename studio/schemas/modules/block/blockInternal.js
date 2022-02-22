import RenderBlockInternalLink from "../../components/block/RenderBlockInternalLink";
import { InternalIcon } from "../../styles/Icons";

export default {
    name: "blockInternal",
    title: "Internal Link",
    type: "object",
    icon: InternalIcon,
    blockEditor: {
        icon: InternalIcon,
        render: RenderBlockInternalLink,
    },
    fields: [
        {
            name: "reference",
            title: "Reference to page:",
            type: "reference",
            to: [{ type: "page" }],
        },
    ],
};

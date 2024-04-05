import RenderBlockInternalLink from "../../components/block/internal/RenderBlockInternalLink";
import { InternalIcon } from "../../styles/Icons";
import GetHeadings from "../../components/block/internal/GetHeadings";

export default {
    name: "blockInternal",
    title: "Internal Link",
    type: "object",
    // options: { editModal: "dialog" },
    icon: () => InternalIcon("small"),
    blockEditor: {
        icon: () => InternalIcon("small"),
        render: RenderBlockInternalLink,
    },
    fields: [
        {
            name: "reference",
            title: "Reference to Page, Landing or Event:",
            type: "reference",
            to: [{ type: "page" }, { type: "landing" }, { type: "event" }],
        },
        {
            name: "place",
            title: "Place on Page",
            type: "string",
            inputComponent: GetHeadings,
        },
    ],
};

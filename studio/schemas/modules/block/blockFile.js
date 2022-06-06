import RenderBlockFiles from "../../components/block/files/RenderBlockFiles";
import { FileIcon } from "../../styles/Icons";

export default {
    name: "blockFile",
    title: "Attach File",
    type: "object",
    icon: () => FileIcon("small"),
    blockEditor: {
        icon: () => FileIcon("small"),
        render: RenderBlockFiles,
    },
    fields: [
        {
            name: "reference",
            title: "Reference to File:",
            type: "reference",
            to: [{ type: "files" }],
        },
    ],
};

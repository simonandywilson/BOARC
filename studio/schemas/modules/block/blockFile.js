import RenderBlockFiles from "../../components/block/RenderBlockFiles";
import { FileIcon } from "../../styles/Icons";

export default {
    name: "blockFile",
    title: "Attach File",
    type: "object",
    icon: FileIcon,
    blockEditor: {
        icon: FileIcon,
        render: RenderBlockFiles,
    },
    fields: [
        {
            name: "reference",
            title: "Reference to file:",
            type: "reference",
            to: [{ type: "files" }],
        },
    ],
};

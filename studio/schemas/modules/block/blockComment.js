import RenderBlockComment from "../../components/block/RenderBlockComment";
import { CommentIcon } from "../../styles/Icons";

export default {
    name: "blockComment",
    title: "Comment",
    type: "object",
    icon: CommentIcon,
    blockEditor: {
        icon: CommentIcon,
        render: RenderBlockComment,
    },
    options: {
        editModal: "dialog",
    },
    fields: [
        {
            name: "comment",
            title: "Comment",
            type: "text",
        },
        {
            name: "reference",
            title: "Reference to page:",
            type: "reference",
            to: [{ type: "page" }],
        },
    ],
};

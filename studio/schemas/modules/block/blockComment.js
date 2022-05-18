import RenderBlockComment from "../../components/block/comment/RenderBlockComment";
import { CommentIcon } from "../../styles/Icons";

export default {
    name: "blockComment",
    title: "Comment",
    type: "object",
    icon: () => CommentIcon("small"),
    blockEditor: {
        icon: () => CommentIcon("small"),
        render: RenderBlockComment,
    },
    options: {
        editModal: "dialog",
    },
    fields: [
        {
            name: "comment",
            title: "Comment",
            type: "basicBlock",
        },
    ],
};

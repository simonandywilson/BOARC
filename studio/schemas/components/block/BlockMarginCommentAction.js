// BlockMarginCommentAction.js
import React from "react";
import { Button } from "@sanity/ui";
import { CommentIcon } from "../../styles/Icons";
import { nanoid } from "nanoid";

function BlockMarginCommentAction({ set, block }) {
    const type = block._type;
    const id = nanoid();
    const handleClick = () => {
        set({
            ...block,
            markDefs: [
                {
                    _type: "blockComment",
                    _key: id,
                },
            ],
            children: [
                {
                    ...block.children[0],
                    marks: [id],
                },
            ],
        });
    };
    return type === "block" ? (
        <Button
            icon={CommentIcon}
            padding={2}
            onClick={handleClick}
            title="Add a comment to this block."
            mode="bleed"
        />
    ) : (
        ""
    );
}

export default BlockMarginCommentAction;

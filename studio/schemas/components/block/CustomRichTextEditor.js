// CustomRichTextEditor.js
import React from "react";
import { BlockEditor } from "part:@sanity/form-builder";
import BlockMarginCommentAction from "./BlockMarginCommentAction.js";

function ArticleBlockEditor(props) {
    return (
        <BlockEditor
            {...props}
            renderBlockActions={BlockMarginCommentAction}
        />
    );
}

export default ArticleBlockEditor;

// CustomRichTextEditor.js
import React from "react";
import { BlockEditor } from "part:@sanity/form-builder";
import renderCustomMarkers from "./renderCustomMarkers";
import BlockMarginActions from "./BlockMarginActions.js";

function ArticleBlockEditor(props) {
    // const { value, markers } = props;
    // const customMarkers = [
    //     {
    //         type: "comment",
    //         path: value && value[0] ? [{ _key: value[0]._key }] : [],
    //         value: "Rephrase this section for clarity!",
    //     },
    // ];
    // const allMarkers = markers.concat(customMarkers); // [...markers, ...customMarkers] works too

    return (
        <BlockEditor
            {...props}
            // markers={allMarkers}
            // renderCustomMarkers={renderCustomMarkers}
            renderBlockActions={BlockMarginActions}
        />
    );
}

export default ArticleBlockEditor;

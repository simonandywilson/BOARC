import React from "react";
const SubheadingStyle = (props) => (
    <h3 style={{ fontWeight: 400, margin: 0, paddingBottom: "0.75rem", paddingTop: "0.5rem" }}>
        {props.children}
    </h3>
);

export default {
    name: "eventBlock",
    title: "Text",
    type: "array",
    of: [
        {
            type: "block",
            styles: [
                { title: "Body", value: "normal" },
                {
                    title: "Subheading",
                    value: "subheading",
                    blockEditor: {
                        render: SubheadingStyle,
                    },
                },
            ],
            lists: [],
            marks: {
                decorators: [],
                annotations: [
                    {
                        type: "blockInternal",
                    },
                    {
                        type: "blockExternal",
                    },
                    {
                        type: "blockFile",
                    },
                ],
            },
        },
        {
            type: "blockImgFull",
        },
    ],
};

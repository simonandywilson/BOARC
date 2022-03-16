import React from "react";
const HeadingStyle = (props) => <h3 style={{ fontWeight: 400, margin: 0 }}>{props.children}</h3>;

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
                    title: "Heading",
                    value: "heading",
                    blockEditor: {
                        render: HeadingStyle,
                    },
                },
            ],
            lists: [],
            marks: {
                decorators: [],
                annotations: [
                    {
                        type: "blockFile",
                    },
                    {
                        type: "blockInternal",
                    },
                    {
                        type: "blockExternal",
                    },
                ],
            },
        },
        {
            type: "blockImgFull",
        },
    ],
};

import React from "react";
const HeadingStyle = (props) => <h3 style={{fontWeight: 400, margin: 0 }}>{props.children}</h3>;

export default {
    name: "programmeBlock",
    title: "Text",
    type: "array",
    of: [
        {
            type: "block",
            styles: [
                {
                    title: "Heading",
                    value: "heading",
                    blockEditor: {
                        render: HeadingStyle,
                    },
                },
                { title: "Body", value: "normal" },
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
    ],
};

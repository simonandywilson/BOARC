import React from "react";
import { CopyIcon } from "../styles/Icons";

const HeadingStyle = (props) => (
    <span
        style={{
            background: "rgba(102,106,47,0.3)",
            borderRadius: "5px",
            padding: "5px",
            color: "var(--card-fg-color)",
            width: "max-content",
            fontWeight: "normal",
        }}
    >
        {props.children}
    </span>
);

const BodyStyle = (props) => (
    <div style={{ paddingLeft: "25px" }}>
        <span>{props.children}</span>
    </div>
);

export default {
    name: "faqBlock",
    title: "FAQ Block",
    icon: () => CopyIcon(),
    type: "array",
    of: [
        {
            type: "block",
            styles: [
                {
                    title: "Heading",
                    value: "h5",
                    blockEditor: {
                        render: HeadingStyle,
                    },
                },
                {
                    title: "Body",
                    value: "normal",
                    blockEditor: {
                        render: BodyStyle,
                    },
                },
            ],
            lists: [],
            marks: {
                decorators: [],
                annotations: [],
            },
        },
    ],
};

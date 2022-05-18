import React from "react";
import { CopyIcon } from "../styles/Icons";
import CustomRichTextEditor from "../components/block/CustomRichTextEditor";

const CenteredStyle = (props) => (
    <div style={{ textAlign: "center" }}>
        <h4 style={{ fontWeight: 500, margin: 0, paddingBottom: "0.75rem", paddingTop: "0.5rem" }}>
            {props.children}
        </h4>
    </div>
);

const SubheadingStyle = (props) => (
    <h3 style={{ fontWeight: 400, margin: 0, paddingBottom: "0.75rem", paddingTop: "0.5rem" }}>{props.children}</h3>
);

const IndentStyle = (props) => (
    <div style={{ marginLeft: "2rem" }}>
        <span>
            {props.children}
        </span>
    </div>
);

export default {
    name: "pageBlock",
    title: "Page Content",
    icon: () => CopyIcon(),
    type: "array",
    inputComponent: CustomRichTextEditor,
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
                {
                    title: "Centered",
                    value: "centered",
                    blockEditor: {
                        render: CenteredStyle,
                    },
                },
                {
                    title: "Indent",
                    value: "indent",
                    blockEditor: {
                        render: IndentStyle,
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
                    {
                        type: "blockComment",
                    },
                ],
            },
        },
        {
            type: "blockHeading",
        },
        {
            type: "blockCollapsible",
        },
        {
            type: "blockCarousel",
        },
        {
            type: "blockImg",
        },
        {
            type: "blockImgGrid",
        },
        {
            type: "blockEvent",
        },
        {
            type: "blockShow",
        },
        {
            type: "blockRadio",
        },
        {
            type: "blockChat",
        },
    ],
};


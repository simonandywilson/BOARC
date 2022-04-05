import React from "react";
import { CopyIconLarge } from "../styles/Icons";
import CustomRichTextEditor from "../components/block/CustomRichTextEditor";

const CenteredStyle = (props) => (
    <div style={{textAlign: 'center'}}>
        <span>{props.children}</span>
    </div>
);

const SubheadingStyle = (props) => (
    <h3 style={{ fontWeight: 400, margin: 0, paddingBottom: "0.75rem" }}>{props.children}</h3>
);

export default {
    name: "pageBlock",
    title: "Page Content",
    icon: CopyIconLarge,
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
    ],
};


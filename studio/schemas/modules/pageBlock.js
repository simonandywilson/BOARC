import React from "react";
import * as style from "../styles/PageBlockStyle.css";
import { CopyIconLarge } from "../styles/Icons";
import CustomRichTextEditor from "../components/block/CustomRichTextEditor";

// const HeadingStyle = (props) => <div className={style.heading}>{props.children}</div>;
const HeadingStyle = (props) => <h3 style={{ fontWeight: 400, margin: 0, paddingBottom: "0.75rem" }}>{props.children}</h3>;

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


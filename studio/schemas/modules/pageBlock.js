import React from "react";
import * as style from "../styles/PageBlockStyle.css";
import { CopyIconLarge } from "../styles/Icons"
import CustomRichTextEditor from "../components/block/CustomRichTextEditor"

const HeadingStyle = (props) => <div className={style.heading}>{props.children}</div>;

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
                // {
                //     title: "Heading",
                //     value: "heading",
                //     blockEditor: {
                //         render: HeadingStyle,
                //     },
                // },
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
            type: "blockCarousel",
        },
        {
            type: "blockImg",
        },
        {
            type: "blockCollapsible",
        },
    ],
};

import React from "react";
import { CopyIcon } from "../styles/Icons";
import CustomRichTextEditor from "../components/block/CustomRichTextEditor";
import * as style from "../styles/text.module.css";

const SubheadingStyle = (props) => <h5 className={style.subheading}>{props.children}</h5>;

// const IndentStyle = (props) => (
//     <div style={{ marginLeft: "2rem" }}>
//         <span>
//             {props.children}
//         </span>
//     </div>
// );

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
                    value: "h5",
                    blockEditor: {
                        render: SubheadingStyle,
                    },
                },
            ],
            lists: [],
            marks: {
                decorators: [{ title: "Strong", value: "strong" }],
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
        {
            type: "blockBackground",
        },
    ],
};

import CustomRichTextEditor from "../components/block/CustomRichTextEditor";

export default {
    name: "collapsibleBlock",
    title: "Text",
    type: "array",
    inputComponent: CustomRichTextEditor,
    of: [
        {
            type: "block",
            styles: [{ title: "Body", value: "normal" }],
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
    ],
};

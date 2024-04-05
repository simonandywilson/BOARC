export default {
    name: "basicBlock",
    title: "Text",
    type: "array",
    of: [
        {
            type: "block",
            styles: [{ title: "Body", value: "normal" }],
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
    ],
};

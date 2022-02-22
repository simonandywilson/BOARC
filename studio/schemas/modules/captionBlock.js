export default {
    name: "captionBlock",
    title: "Caption",
    type: "array",
    of: [
        {
            type: "block",
            styles: [
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

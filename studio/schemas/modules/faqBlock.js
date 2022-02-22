import { CopyIconLarge } from "../styles/Icons";

export default {
    name: "faqBlock",
    title: "FAQ Block",
    icon: CopyIconLarge,
    type: "array",
    of: [
        {
            type: "block",
            styles: [
                { title: "Heading", value: "h5" },
                { title: "Body", value: "normal" },
            ],
            lists: [],
            marks: {
                decorators: [],
                annotations: [],
            },
        },
    ],
};

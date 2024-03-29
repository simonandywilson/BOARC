import { RadioIcon } from "../../styles/Icons";

export default {
    name: "blockRadio",
    title: "Radio",
    type: "object",
    icon: () => RadioIcon("small"),
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "url",
            title: "Stream URL",
            type: "url",
            validation: (Rule) =>
                Rule.uri({
                    scheme: ["https"],
                }),
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "url",
        },
    },
};

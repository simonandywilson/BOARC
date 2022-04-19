import { RadioIcon } from "../../styles/Icons";

export default {
    name: "blockRadio",
    title: "Radio",
    type: "object",
    icon: RadioIcon,
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
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "url",
        },
    },
};

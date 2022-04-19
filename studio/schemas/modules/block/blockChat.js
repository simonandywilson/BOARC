import { ChatIcon } from "../../styles/Icons";

export default {
    name: "blockChat",
    title: "Chat",
    type: "object",
    icon: ChatIcon,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
    ],
    preview: {
        select: {
            title: "title",
        },
    },
};

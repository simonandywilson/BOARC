import { EventIcon } from "../styles/Icons";

export default {
    name: "eventExternal",
    title: "Event External",
    icon: () => EventIcon(),
    type: "document",

    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
    ],
};

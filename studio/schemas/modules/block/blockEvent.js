import { CollapsibleIcon } from "../../styles/Icons";

export default {
    name: "blockEvent",
    title: "Event",
    type: "object",
    icon: CollapsibleIcon,
    fields: [
        {
            name: "type",
            title: "Type",
            type: "string",
            options: {
                list: [
                    { title: "Carousel", value: "carousel" },
                    { title: "List", value: "list" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "carousel",
        },
        {
            name: "tense",
            title: "Tense",
            type: "string",
            options: {
                list: [
                    { title: "Future", value: "future" },
                    { title: "Past", value: "past" },
                ],
                layout: "radio",
                direction: "horizontal",
            },
            initialValue: "future",
        },
    ],
};

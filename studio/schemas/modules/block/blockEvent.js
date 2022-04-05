import { EventIconAlt, EventIconAltLarge } from "../../styles/Icons";

export default {
    name: "blockEvent",
    title: "Event",
    type: "object",
    icon: EventIconAlt,
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
    preview: {
        select: {
            type: "type",
            tense: "tense",
        },
        prepare(selection) {
            const {type, tense } = selection;
            const capitalise = (s) => s && s[0].toUpperCase() + s.slice(1);
            return {
                title: `${capitalise(tense)} Events`,
                subtitle: capitalise(type),
                media: EventIconAltLarge,
            };
        },
    },
};

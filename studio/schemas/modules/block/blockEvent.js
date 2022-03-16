import { EventIconAlt, EventIconAltLarge } from "../../styles/Icons";
import RenderHeading from "../../components/heading/RenderHeading";

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
        {
            name: "heading",
            title: "Heading",
            type: "string",
        },
        {
            name: "border",
            title: "Border",
            type: "reference",
            to: [{ type: "borders" }],
        },
        {
            name: "headingPreview",
            title: "Heading Preview",
            type: "string",
            inputComponent: RenderHeading,
        },
    ],
    preview: {
        select: {
            heading: "heading",
            type: "type",
            tense: "tense",
        },
        prepare(selection) {
            const { heading, type, tense } = selection;
            const capitalise = (s) => s && s[0].toUpperCase() + s.slice(1);
            return {
                title: heading ? heading : "Events",
                subtitle: capitalise(type),
                media: EventIconAltLarge,
            };
        },
    },
};

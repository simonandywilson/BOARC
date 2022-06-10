import RenderBorder from "../components/border/RenderBorder";
import { BordersIcon } from "../styles/Icons";

export default {
    name: "borders",
    title: "Border",
    icon: () => BordersIcon(),
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required().error(`Your border needs a name.`),
        },
        {
            name: "borderTop",
            title: "Border Top",
            type: "string",
            validation: (Rule) => Rule.required().max(1).error(`Enter a single character only.`),
        },
        {
            name: "borderBottom",
            title: "Border Bottom",
            type: "string",
            validation: (Rule) => Rule.required().max(1).error(`Enter a single character only.`),
        },
        {
            name: "borderPreview",
            title: "Border Preview",
            type: "string",
            inputComponent: RenderBorder,
        },
    ],
    preview: {
        select: {
            title: "name",
            borderTop: "borderTop",
            borderBottom: "borderBottom",
        },
        prepare(selection) {
            const { title, borderTop, borderBottom } = selection;
            return {
                title: title ?? "Border",
                media: () => BordersIcon(),
                subtitle:
                    borderTop &&
                    borderBottom &&
                    `${borderTop.repeat(15)}  ${borderBottom.repeat(15)}`,
            };
        },
    },
};

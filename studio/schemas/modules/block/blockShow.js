import { ShowIcon } from "../../styles/Icons";

export default {
    name: "blockShow",
    title: "Shows",
    type: "object",
    icon: ShowIcon,
    fields: [
        {
            name: "number",
            title: "Number of Shows Visible",
            type: "number",
            initialValue: 5,
        },
    ],
    preview: {
        select: {
            subtitle: "number",
        },
        prepare(selection) {
            return {
                title: "Past Shows",
                subtitle: `${selection.subtitle} Shows Visible`,
            };
        },
    },
};

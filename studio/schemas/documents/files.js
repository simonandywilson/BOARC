import { FilesIcon} from "../styles/Icons";

export default {
    name: "files",
    title: "File",
    icon: () =>FilesIcon(),
    type: "document",
    fields: [
        {
            title: "Last Published",
            name: "publishedAt",
            type: "datetime",
            readOnly: true,
        },
        {
            name: "title",
            title: "File Name",
            type: "string",
        },
        {
            title: "File",
            name: "file",
            type: "file",
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "publishedAt",
        },
        prepare(selection) {
            const { title, subtitle } = selection;
            const date = new Date(subtitle);
            return {
                title: title ?? "File",
                subtitle: subtitle && date.toLocaleDateString("en-GB"),
            };
        },
    },
};

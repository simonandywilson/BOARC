import RenderBlockExternalLink from "../../components/block/external/RenderBlockExternalLink";
import { ExternalIcon } from "../../styles/Icons";

export default {
    name: "blockExternal",
    title: "External Link",
    type: "object",
    icon: ExternalIcon,
    blockEditor: {
        icon: ExternalIcon,
        render: RenderBlockExternalLink,
    },
    fields: [
        {
            name: "type",
            title: "Type",
            type: "string",
            options: {
                list: [
                    { title: "Website", value: "web" },
                    { title: "Email", value: "email" },
                    { title: "Telephone", value: "telephone" },
                ],
                layout: "radio",
            },
            initialValue: "web",
        },
        {
            name: "link",
            title: "Link",
            type: "string",
            description: "Can be website, email or telephone number.",
        },
    ],
};

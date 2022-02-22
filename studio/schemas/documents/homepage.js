import RenderAsciiBanner from "../components/ascii/RenderAsciiBanner";
import { HomepageIconLarge } from "../styles/Icons";

export default {
    name: "homepage",
    title: "Homepage",
    type: "document",
    icon: HomepageIconLarge,
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    fields: [
        { name: "title", title: "Website Title", type: "string" },
        {
            name: "ascii",
            title: "ASCII Banner",
            type: "array",
            of: [{ type: "reference", to: [{ type: "ascii" }], title: "Reference to ASCII" }],
        },
        {
            name: "bannerPreview",
            title: "ASCII Banner Preview",
            type: "string",
            inputComponent: RenderAsciiBanner,
        },
    ],
};

import RenderAsciiBanner from "../components/ascii/RenderAsciiBanner";
import { HomepageIcon } from "../styles/Icons";

export default {
    name: "homepage",
    title: "Homepage",
    type: "document",
    icon: () => HomepageIcon(),
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    fields: [
        { name: "title", title: "Website Title", type: "string" },
        {
            name: "initial",
            title: "Initial Page",
            description: "Choose which page is shown on the homepage.",
            type: "reference",
            to: [{ type: "page" }, { type: "landing" }],
            validation: (Rule) =>
                Rule.required().error("Please choose a page to show on the homepage."),
        },
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
    preview: {
        prepare() {
            return {
                title: "Homepage",
                icon: () => HomepageIcon(),
            };
        },
    },
};

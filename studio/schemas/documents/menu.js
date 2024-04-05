import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { MenuIcon, MenuIconSingle } from "../styles/Icons";
import CreateLanding from "../components/createLanding/CreateLanding";

export default {
    name: "menu",
    title: "Menu",
    icon: () => MenuIcon(),
    type: "document",
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "menu" }),
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "landing",
            title: "Landing",
            type: "reference",
            to: [{ type: "landing", title: "Reference to Landing Page" }],
            options: { disableNew: true },
            hidden: ({ parent }) => {
                if ("pages" in parent) {
                    if (parent.pages.length <= 1) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            },
            validation: (Rule) =>
                Rule.custom((name, context) => {
                    const pages = context.parent.pages ? context.parent.pages.length : 0;
                    if (pages > 1 && typeof name === "undefined") {
                        return "Multi page menus must have a landing page.";
                    } else {
                        return true;
                    }
                }),
        },
        {
            name: "createLanding",
            title: "Auto Create Landing Page",
            type: "string",
            inputComponent: CreateLanding,
            hidden: ({ parent }) => {
                if ("pages" in parent) {
                    if ("landing" in parent) {
                        return true;
                    }

                    if (parent.pages.length <= 1) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return true;
            },
        },
        {
            name: "pages",
            title: "Pages",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "page" }],
                    title: "Reference to Pages",
                },
            ],
        },
    ],
    preview: {
        select: {
            title: "title",
            pages: "pages",
        },
        prepare(selection) {
            const { title, pages } = selection;
            return {
                title: title ? title : "Menu Item",
                media: pages && pages.length > 1 ? () => MenuIcon() : () => MenuIconSingle(),
                subtitle: pages && pages.length > 1 ? "Multi" : "Tabs",
            };
        },
    },
};

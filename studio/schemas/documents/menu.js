import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { MenuIconLarge, MenuIconSingleLarge } from "../styles/Icons";
import RenderLanding from "../components/landing/RenderLanding"

export default {
    name: "menu",
    title: "Menu",
    icon: MenuIconLarge,
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
            name: "pages",
            title: "Pages",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "page" }],
                    title: "Reference to Pages or Events",
                },
            ],
        },
        {
            name: "landing",
            title: "Landing",
            type: "string",
            readOnly: true,
            inputComponent: RenderLanding,
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
                media: pages && pages.length > 1 ? MenuIconLarge : MenuIconSingleLarge,
                subtitle: pages && pages.length > 1 ? "Multi" : "Tabs",
            };
        },
    },
};
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { FAQIconLarge } from "../styles/Icons";

export default {
    name: "faq",
    title: "FAQ",
    icon: FAQIconLarge,
    type: "document",
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "faq" }),
        {
            name: "title",
            title: "Section Title",
            type: "string",
            description: "Used to navigate between FAQ sections.",
        },
        {
            name: "text",
            title: "FAQ",
            type: "faqBlock",
        },
    ],
};

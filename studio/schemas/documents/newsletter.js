import { NewsletterIcon } from "../styles/Icons";

export default {
    name: "newsletter",
    title: "Newsletter",
    type: "document",
    icon: () => NewsletterIcon(),
    fields: [
        {
            name: "text",
            title: "Sign Up Text",
            type: "text",
            rows: 2,
        },
    ],
};

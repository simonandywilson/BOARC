import { NewsletterIcon } from "../styles/Icons";

export default {
    name: "newsletter",
    title: "Newsletter",
    type: "document",
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
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

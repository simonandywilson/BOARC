import { SubscriberIcon } from "../styles/Icons";

export default {
    name: "subscriber",
    title: "Subscriber",
    icon: () => SubscriberIcon(),
    type: "document",
    __experimental_actions: [ /*'create',*/ /*"update"*/ "delete" /*"publish"*/],
    fields: [
        {
            name: "subscribedAt",
            title: "Subscription Date",
            type: "datetime",
            readOnly: true,
        },
        {
            name: "email",
            title: "Email",
            type: "string",
            readOnly: true,
        },
    ],
    preview: {
        select: {
            subtitle: "email",
        },
        prepare(selection) {
            const { subtitle } = selection;
            return {
                title: "Subscriber",
                subtitle: subtitle && subtitle,
                media: () => SubscriberIcon(),
            };
        },
    },
};

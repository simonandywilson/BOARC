import { useEffect } from "react";
import {
    useEventsFutureContext,
    useEventsFutureUpdateContext,
    useEventsPastContext,
    useEventsPastUpdateContext,
    useEventsAccessedContext,
    useColoursContext,
} from "../../state/GlobalState";
const sanityClient = require("@sanity/client");
const client = sanityClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-03-08",
    useCdn: true,
});
const futureEvents = `*[_type == "event" && dateTime(start) > dateTime(now())] {_id, type, title, "slug": slug.current, url, start, end, "icon": icon.asset->{url}, previewText} | order(start asc)`;

const pastEvents =
    '*[_type == "event" && dateTime(start) < dateTime(now())] {_id, type, title, "slug": slug.current, url, start, end, "icon": icon.asset->{url}, previewText} | order(start desc)';

const Fetch = () => {
    const EventsFutureContext = useEventsFutureContext();
    const EventsFutureUpdateContext = useEventsFutureUpdateContext();
    const EventsPastContext = useEventsPastContext();
    const EventsPastUpdateContext = useEventsPastUpdateContext();
    const EventsAccessedContext = useEventsAccessedContext();

    const ColoursContext = useColoursContext();

    useEffect(() => {
        document.documentElement.style.setProperty("--text-colour", ColoursContext.text);
    }, [ColoursContext]);

    useEffect(() => {
        if (
            EventsAccessedContext &&
            EventsFutureContext.length === 0 &&
            EventsPastContext.length === 0
        ) {
            client
                .fetch(
                    `{
                    "futureEvents": ${futureEvents},
                    "pastEvents": ${pastEvents},
                    }`
                )
                .then((events) => {
                    EventsFutureUpdateContext(events.futureEvents);
                    EventsPastUpdateContext(events.pastEvents);
                })
                .catch((error) => console.error(error.message));
        }
    }, [EventsAccessedContext]);
    return null;
};

export default Fetch;

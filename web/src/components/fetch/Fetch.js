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
const futureEvents =
    '*[_type == "event" && dateTime(start) > dateTime(now())] {_id, title, "slug": slug.current, start, "icon": icon.asset->, previewText} | order(start asc)';

const pastEvents =
    '*[_type == "event" && dateTime(start) < dateTime(now())] {_id, title, "slug": slug.current, start, "icon": icon.asset->, previewText} | order(start asc)';

const Fetch = () => {
    const EventsFutureContext = useEventsFutureContext();
    const EventsFutureUpdateContext = useEventsFutureUpdateContext();
    const EventsPastContext = useEventsPastContext();
    const EventsPastUpdateContext = useEventsPastUpdateContext();
    const EventsAccessedContext = useEventsAccessedContext();

    const ColoursContext = useColoursContext();

    useEffect(() => {
        document.documentElement.style.setProperty("--text-colour", ColoursContext.text);
    }, [ColoursContext])

    useEffect(() => {
        if (EventsAccessedContext && EventsFutureContext.length === 0 && EventsPastContext.length === 0) {
            console.log("fetching...");
            client
                .fetch(futureEvents)
                .then((events) => EventsFutureUpdateContext(events))
                .catch((error) => console.error(error.message));
            client
                .fetch(pastEvents)
                .then((events) => EventsPastUpdateContext(events))
                .catch((error) => console.error(error.message));
        }
    }, [EventsAccessedContext]);
    return null;
};

export default Fetch;

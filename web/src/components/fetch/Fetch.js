import { useEffect } from "react";
import {
	useEventsFutureContext,
	useEventsFutureUpdateContext,
	useEventsPastContext,
	useEventsPastUpdateContext,
	useEventsPastCountUpdateContext,
	useEventsPastFetchSpanContext,
	useEventsPastFetchStatusContext,
	useEventsPastFetchStatusUpdateContext,
	useEventsAccessedContext,
	useColoursContext,
} from "../../state/GlobalState";
import { createClient } from "@sanity/client";

 const client = createClient({
	projectId: process.env.GATSBY_SANITY_PROJECT_ID,
	dataset: "production",
	useCdn: false,
	apiVersion: "2023-05-03",
	token: process.env.GATSBY_SANITY_TOKEN,
});

const futureEvents = `*[_type == "event" && dateTime(end) > dateTime(now())] {_id, type, title, "slug": slug.current, url, start, end, "icon": icon.asset->_id, previewText} | order(start asc)`;

const pastEvents =
	'*[_type == "event" && dateTime(end) < dateTime(now())][$start..$end] {_id, type, title, "slug": slug.current, url, start, end, "icon": icon.asset->_id, previewText} | order(start desc)';

const pastEventsCount = 'count(*[_type == "event" && dateTime(start) < dateTime(now())])';

const Fetch = () => {
	const EventsFutureContext = useEventsFutureContext();
	const EventsFutureUpdateContext = useEventsFutureUpdateContext();
	const EventsPastContext = useEventsPastContext();
	const EventsPastUpdateContext = useEventsPastUpdateContext();
	const EventsPastCountUpdateContext = useEventsPastCountUpdateContext();
	const EventsPastFetchSpanContext = useEventsPastFetchSpanContext();
	const EventsPastFetchStatusContext = useEventsPastFetchStatusContext();
	const EventsPastFetchStatusUpdateContext = useEventsPastFetchStatusUpdateContext();
	const EventsAccessedContext = useEventsAccessedContext();

	const ColoursContext = useColoursContext();

	useEffect(() => {
		document.documentElement.style.setProperty("--text-colour", ColoursContext.text);
	}, [ColoursContext]);

	useEffect(() => {
		if (EventsAccessedContext && EventsFutureContext.length === 0 && EventsPastContext.length === 0) {
			client
				.fetch(
					`{
                    "futureEvents": ${futureEvents},
                    "pastEvents": ${pastEvents},
                    "pastEventsCount": ${pastEventsCount},
                    }`,
					{ start: 0, end: 5 }
				)
				.then((events) => {
					console.log(events);
					EventsFutureUpdateContext(events.futureEvents);
					EventsPastUpdateContext(events.pastEvents);
					EventsPastCountUpdateContext(events.pastEventsCount);
				})
				.catch((error) => console.error(error.message));
		}
	}, [EventsAccessedContext]);

	// Fetch older events on request
	useEffect(() => {
		let mounted = true;
		if (mounted && EventsPastFetchStatusContext === "fetching") {
			client
				.fetch(pastEvents, {
					start: EventsPastFetchSpanContext.start,
					end: EventsPastFetchSpanContext.end,
				})
				.then((chats) => {
					EventsPastFetchStatusUpdateContext("default");
					EventsPastUpdateContext((oldArray) => [...oldArray, ...chats]);
				});
		}
		return () => (mounted = false);
	}, [EventsPastFetchSpanContext]);

	return null;
};

export default Fetch;

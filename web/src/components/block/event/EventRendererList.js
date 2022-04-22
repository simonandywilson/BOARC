import React, { useEffect } from "react";
import {
    useEventsFutureContext,
    useEventsPastContext,
    useEventsAccessedUpdateContext,
} from "../../../state/GlobalState";
import EventRendererListRow from "./EventRendererListRow";
import EventRendererListLoader from "./EventRendererListLoader";

const EventRendererList = ({ value, width }) => {
    const tense = value.tense;
    const EventsAccessedUpdateContext = useEventsAccessedUpdateContext();
    const EventsFutureContext = useEventsFutureContext();
    const EventsPastContext = useEventsPastContext();
    useEffect(() => EventsAccessedUpdateContext(true), []);

    return (
        <>
            {tense === "future" ? (
                EventsFutureContext.length > 0 ? (
                    EventsFutureContext.map((event) => (
                        <EventRendererListRow
                            key={event._id}
                            data={event}
                            tense={"future"}
                            width={width}
                        />
                    ))
                ) : (
                    <EventRendererListLoader width={width} />
                )
            ) : EventsPastContext.length > 0 ? (
                EventsPastContext.map((event) => (
                    <EventRendererListRow
                        key={event._id}
                        data={event}
                        tense={"past"}
                        width={width}
                    />
                ))
            ) : (
                <EventRendererListLoader width={width} />
            )}
        </>
    );
};

export default EventRendererList;

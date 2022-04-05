import React, { useEffect } from "react";
import {
    useEventsFutureContext,
    useEventsPastContext,
    useEventsAccessedUpdateContext,
} from "../../../state/GlobalState";
import EventRendererListRow from "./EventRendererListRow";

const EventRendererList = ({ value, width }) => {
    const tense = value.tense;
    const EventsAccessedUpdateContext = useEventsAccessedUpdateContext();
    const EventsFutureContext = useEventsFutureContext();
    const EventsPastContext = useEventsPastContext();
    useEffect(() => EventsAccessedUpdateContext(true), []);

    return (
        <>
            {EventsFutureContext.length > 0 &&
                tense === "future" &&
                EventsFutureContext.map((event) => (
                    <EventRendererListRow
                        key={event._id}
                        data={event}
                        tense={"future"}
                        width={width}
                    />
                ))}
            {EventsPastContext.length > 0 &&
                tense === "past" &&
                EventsPastContext.map((event) => (
                    <EventRendererListRow
                        key={event._id}
                        data={event}
                        tense={"past"}
                        width={width}
                    />
                ))}
        </>
    );
};

export default EventRendererList;

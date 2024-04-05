import React, { useEffect } from "react";
import {
    useEventsFutureContext,
    useEventsPastContext,
    useEventsAccessedUpdateContext,
    useEventsPastFetchSpanUpdateContext,
    useEventsPastFetchStatusContext,
    useEventsPastFetchStatusUpdateContext,

    useEventsPastCountContext,
} from "../../../state/GlobalState";
import EventRendererListRow from "./EventRendererListRow";
import EventRendererListLoader from "./EventRendererListLoader";
import * as style from "./list.module.css";

const EventRendererList = ({ value, width }) => {
    const tense = value.tense;
    const EventsAccessedUpdateContext = useEventsAccessedUpdateContext();
    const EventsFutureContext = useEventsFutureContext();
    const EventsPastContext = useEventsPastContext();
    const EventsPastFetchSpanUpdateContext = useEventsPastFetchSpanUpdateContext();
    const EventsPastFetchStatusContext = useEventsPastFetchStatusContext();
    const EventsPastFetchStatusUpdateContext = useEventsPastFetchStatusUpdateContext();
    const EventsPastCountContext = useEventsPastCountContext();
    useEffect(() => EventsAccessedUpdateContext(true), []);
    const toFetch = 5;

    const updateFetchSpan = () => {
        EventsPastFetchStatusUpdateContext("fetching");
        EventsPastFetchSpanUpdateContext((prevState) => {
            return { start: prevState.end + 1, end: prevState.end + toFetch + 1 };
        });
    };

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
                <>
                    {EventsPastContext.map((event) => (
                        <EventRendererListRow
                            key={event._id}
                            data={event}
                            tense={"past"}
                            width={width}
                        />
                    ))}
                    <div className={style.grid}>
                        <div
                            className={style.load}
                            style={{
                                gridColumn:
                                    width === "wide"
                                        ? "var(--grid-position-main-wide)"
                                        : "var(--grid-position-main-normal)",
                            }}
                        >
                            {EventsPastCountContext !== EventsPastContext.length && (
                                <button
                                    onClick={updateFetchSpan}
                                    aria-label="Load more past events"
                                    disabled={EventsPastFetchStatusContext === "default" ? false : true}
                                >
                                    {EventsPastFetchStatusContext === "default" ? (
                                        <span>Load more...</span>
                                    ) : (
                                        <span className={style.spinner}></span>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <EventRendererListLoader width={width} />
            )}
        </>
    );
};

export default EventRendererList;

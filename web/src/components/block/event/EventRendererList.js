import React, { useEffect } from "react";
import {
    useEventsFutureContext,
    useEventsPastContext,
    useEventsAccessedUpdateContext,
} from "../../../state/GlobalState";
import * as style from "./list.module.css";
import EventRendererListRow from "./EventRendererListRow";

const EventRendererList = ({ value }) => {
    const tense = value.tense;
    const EventsAccessedUpdateContext = useEventsAccessedUpdateContext();
    const EventsFutureContext = useEventsFutureContext();
    const EventsPastContext = useEventsPastContext();
    useEffect(() => EventsAccessedUpdateContext(true), []);

    return (
        <>
            {EventsFutureContext.length > 0 && tense === "future" && (
                <>
                    <div className={style.grid}>
                        <h2 className={style.heading}>
                            <span>{"*".repeat(100)}</span>
                            Upcoming Events
                            <span>{"*".repeat(100)}</span>
                        </h2>
                    </div>
                    {EventsFutureContext.map((event) => (
                        <EventRendererListRow key={event._id} data={event} tense={"future"} />
                    ))}
                </>
            )}
            {EventsPastContext.length > 0 && tense === "past" && (
                <>
                    <div className={style.grid}>
                        <h2 className={style.heading} style={{color: "var(--red)"}}>
                            <span>{")".repeat(100)}</span>
                            Past Events
                            <span>{")".repeat(100)}</span>
                        </h2>
                    </div>
                    {EventsPastContext.map((event) => (
                        <EventRendererListRow key={event._id} data={event} tense={"past"} />
                    ))}
                </>
            )}
        </>
    );
};

export default EventRendererList;

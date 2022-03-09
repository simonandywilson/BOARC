import React, { useEffect } from "react";
import {
    useEventsFutureContext,
    useEventsPastContext,
    useEventsAccessedUpdateContext,
} from "../../../state/GlobalState";
import EventRendererCarouselSlide from "./EventRendererCarouselSlide";


const EventRendererCarousel = ({ value }) => {
    const tense = value.tense;
    const EventsAccessedUpdateContext = useEventsAccessedUpdateContext();
    const EventsFutureContext = useEventsFutureContext();
    const EventsPastContext = useEventsPastContext();
    useEffect(() => EventsAccessedUpdateContext(true), []);
    return (
        <>
            {EventsFutureContext.length > 0 &&
                tense === "future" &&
                <EventRendererCarouselSlide data={EventsFutureContext} tense={"future"} />}
            {EventsPastContext.length > 0 &&
                tense === "past" &&
                <EventRendererCarouselSlide data={EventsPastContext} tense={"future"} />}
        </>
    );
};

export default EventRendererCarousel;

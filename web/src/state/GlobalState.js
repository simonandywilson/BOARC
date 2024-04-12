import React, { createContext, useContext, useState } from "react";

// Active
const ActiveContext = createContext();
const ActiveUpdateContext = createContext();

export const useActiveContext = () => {
    return useContext(ActiveContext);
};

export const useActiveUpdateContext = () => {
    return useContext(ActiveUpdateContext);
};

// Active
const SubheadingContext = createContext();
const SubheadingUpdateContext = createContext();

export const useSubheadingContext = () => {
    return useContext(SubheadingContext);
};

export const useSubheadingUpdateContext = () => {
    return useContext(SubheadingUpdateContext);
};

// Easy Read
const EasyReadContext = createContext();
const EasyReadUpdateContext = createContext();

export const useEasyReadContext = () => {
    return useContext(EasyReadContext);
};

export const useEasyReadUpdateContext = () => {
    return useContext(EasyReadUpdateContext);
};

// Events Future
const EventsFutureContext = createContext();
const EventsFutureUpdateContext = createContext();

export const useEventsFutureContext = () => {
    return useContext(EventsFutureContext);
};

export const useEventsFutureUpdateContext = () => {
    return useContext(EventsFutureUpdateContext);
};

// Events Past
const EventsPastContext = createContext();
const EventsPastUpdateContext = createContext();

export const useEventsPastContext = () => {
    return useContext(EventsPastContext);
};

export const useEventsPastUpdateContext = () => {
    return useContext(EventsPastUpdateContext);
};

// Events Past Count
const EventsPastCountContext = createContext();
const EventsPastCountUpdateContext = createContext();

export const useEventsPastCountContext = () => {
    return useContext(EventsPastCountContext);
};

export const useEventsPastCountUpdateContext = () => {
    return useContext(EventsPastCountUpdateContext);
};

// Events Past Fetch Span
const EventsPastFetchSpanContext = createContext();
const EventsPastFetchSpanUpdateContext = createContext();

export const useEventsPastFetchSpanContext = () => {
    return useContext(EventsPastFetchSpanContext);
};

export const useEventsPastFetchSpanUpdateContext = () => {
    return useContext(EventsPastFetchSpanUpdateContext);
};
// Events Past Fetch Status
const EventsPastFetchStatusContext = createContext();
const EventsPastFetchStatusUpdateContext = createContext();

export const useEventsPastFetchStatusContext = () => {
    return useContext(EventsPastFetchStatusContext);
};

export const useEventsPastFetchStatusUpdateContext = () => {
    return useContext(EventsPastFetchStatusUpdateContext);
};

// Events Accessed
const EventsAccessedContext = createContext();
const EventsAccessedUpdateContext = createContext();

export const useEventsAccessedContext = () => {
    return useContext(EventsAccessedContext);
};

export const useEventsAccessedUpdateContext = () => {
    return useContext(EventsAccessedUpdateContext);
};

// Colours
const ColoursContext = createContext();
const ColoursUpdateContext = createContext();

export const useColoursContext = () => {
    return useContext(ColoursContext);
};

export const useColoursUpdateContext = () => {
    return useContext(ColoursUpdateContext);
};

// Ascii
const AsciiContext = createContext();
const AsciiUpdateContext = createContext();

export const useAsciiContext = () => {
    return useContext(AsciiContext);
};

export const useAsciiUpdateContext = () => {
    return useContext(AsciiUpdateContext);
};

// Context Provider
const ContextProvider = ({ children }) => {
    const [active, setActive] = useState("");
    const [subheading, setSubheading] = useState("");
    const [easyRead, setEasyRead] = useState({ text: false, image: false, bw: false, traces: false });
    const [eventsFuture, setEventsFuture] = useState([]);
    const [eventsPast, setEventsPast] = useState([]);
    const [eventsPastCount, setEventsPastCount] = useState(null);
    const [eventsPastFetchSpan, setEventsPastFetchSpan] = useState({ start: 0, end: 5 });
    const [eventsPastFetchStatus, setEventsPastFetchStatus] = useState("default");
    const [eventsAccessed, setEventsAccessed] = useState(false);
    const [colours, setColours] = useState({ text: "var(--brown)" });
    const [ascii, setAscii] = useState(true);

    return (
        <ActiveContext.Provider value={active}>
            <ActiveUpdateContext.Provider value={setActive}>
                <SubheadingContext.Provider value={subheading}>
                    <SubheadingUpdateContext.Provider value={setSubheading}>
                        <EasyReadContext.Provider value={easyRead}>
                            <EasyReadUpdateContext.Provider value={setEasyRead}>
                                <EventsFutureContext.Provider value={eventsFuture}>
                                    <EventsFutureUpdateContext.Provider value={setEventsFuture}>
                                        <EventsPastContext.Provider value={eventsPast}>
                                            <EventsPastUpdateContext.Provider value={setEventsPast}>
                                                <EventsPastCountContext.Provider
                                                    value={eventsPastCount}
                                                >
                                                    <EventsPastCountUpdateContext.Provider
                                                        value={setEventsPastCount}
                                                    >
                                                        <EventsPastFetchSpanContext.Provider
                                                            value={eventsPastFetchSpan}
                                                        >
                                                            <EventsPastFetchSpanUpdateContext.Provider
                                                                value={setEventsPastFetchSpan}
                                                            >
                                                                <EventsPastFetchStatusContext.Provider
                                                                    value={eventsPastFetchStatus}
                                                                >
                                                                    <EventsPastFetchStatusUpdateContext.Provider
                                                                        value={
                                                                            setEventsPastFetchStatus
                                                                        }
                                                                    >
                                                                        <EventsAccessedContext.Provider
                                                                            value={eventsAccessed}
                                                                        >
                                                                            <EventsAccessedUpdateContext.Provider
                                                                                value={
                                                                                    setEventsAccessed
                                                                                }
                                                                            >
                                                                                <ColoursContext.Provider
                                                                                    value={colours}
                                                                                >
                                                                                    <ColoursUpdateContext.Provider
                                                                                        value={
                                                                                            setColours
                                                                                        }
                                                                                    >
                                                                                        <AsciiContext.Provider
                                                                                            value={
                                                                                                ascii
                                                                                            }
                                                                                        >
                                                                                            <AsciiUpdateContext.Provider
                                                                                                value={
                                                                                                    setAscii
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    children
                                                                                                }
                                                                                            </AsciiUpdateContext.Provider>
                                                                                        </AsciiContext.Provider>
                                                                                    </ColoursUpdateContext.Provider>
                                                                                </ColoursContext.Provider>
                                                                            </EventsAccessedUpdateContext.Provider>
                                                                        </EventsAccessedContext.Provider>
                                                                    </EventsPastFetchStatusUpdateContext.Provider>
                                                                </EventsPastFetchStatusContext.Provider>
                                                            </EventsPastFetchSpanUpdateContext.Provider>
                                                        </EventsPastFetchSpanContext.Provider>
                                                    </EventsPastCountUpdateContext.Provider>
                                                </EventsPastCountContext.Provider>
                                            </EventsPastUpdateContext.Provider>
                                        </EventsPastContext.Provider>
                                    </EventsFutureUpdateContext.Provider>
                                </EventsFutureContext.Provider>
                            </EasyReadUpdateContext.Provider>
                        </EasyReadContext.Provider>
                    </SubheadingUpdateContext.Provider>
                </SubheadingContext.Provider>
            </ActiveUpdateContext.Provider>
        </ActiveContext.Provider>
    );
};

export default ContextProvider;

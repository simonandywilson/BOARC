import React, { createContext, useContext, useState } from "react";

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
    const [easyRead, setEasyRead] = useState({ text: false, image: false });
    const [eventsFuture, setEventsFuture] = useState([]);
    const [eventsPast, setEventsPast] = useState([]);
    const [eventsAccessed, setEventsAccessed] = useState(false);
    const [colours, setColours] = useState({ text: "var(--brown)" });
    const [ascii, setAscii] = useState(true);

    return (
        <EasyReadContext.Provider value={easyRead}>
            <EasyReadUpdateContext.Provider value={setEasyRead}>
                <EventsFutureContext.Provider value={eventsFuture}>
                    <EventsFutureUpdateContext.Provider value={setEventsFuture}>
                        <EventsPastContext.Provider value={eventsPast}>
                            <EventsPastUpdateContext.Provider value={setEventsPast}>
                                <EventsAccessedContext.Provider value={eventsAccessed}>
                                    <EventsAccessedUpdateContext.Provider value={setEventsAccessed}>
                                        <ColoursContext.Provider value={colours}>
                                            <ColoursUpdateContext.Provider value={setColours}>
                                                <AsciiContext.Provider value={ascii}>
                                                    <AsciiUpdateContext.Provider value={setAscii}>
                                                        {children}
                                                    </AsciiUpdateContext.Provider>
                                                </AsciiContext.Provider>
                                            </ColoursUpdateContext.Provider>
                                        </ColoursContext.Provider>
                                    </EventsAccessedUpdateContext.Provider>
                                </EventsAccessedContext.Provider>
                            </EventsPastUpdateContext.Provider>
                        </EventsPastContext.Provider>
                    </EventsFutureUpdateContext.Provider>
                </EventsFutureContext.Provider>
            </EasyReadUpdateContext.Provider>
        </EasyReadContext.Provider>
    );
};

export default ContextProvider;

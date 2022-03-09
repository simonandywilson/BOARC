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

// Context Provider
const ContextProvider = ({ children }) => {
    const [easyRead, setEasyRead] = useState(false);
    const [eventsFuture, setEventsFuture] = useState([]);
    const [eventsPast, setEventsPast] = useState([]);
    const [eventsAccessed, setEventsAccessed] = useState(false);

    return (
        <EasyReadContext.Provider value={easyRead}>
            <EasyReadUpdateContext.Provider value={setEasyRead}>
                <EventsFutureContext.Provider value={eventsFuture}>
                    <EventsFutureUpdateContext.Provider value={setEventsFuture}>
                        <EventsPastContext.Provider value={eventsPast}>
                            <EventsPastUpdateContext.Provider value={setEventsPast}>
                                <EventsAccessedContext.Provider value={eventsAccessed}>
                                    <EventsAccessedUpdateContext.Provider value={setEventsAccessed}>
                                        {children}
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

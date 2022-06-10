import React, { useState, useEffect, useMemo, useRef } from "react";
import Pusher from "pusher-js";
import * as style from "./chat.module.css";
import ChatRendererInput from "./ChatRendererInput";
import ChatRendererComment from "./ChatRendererComment";
import { motion } from "framer-motion";

const sanityClient = require("@sanity/client");
const client = sanityClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-04-21",
    useCdn: false,
});

const ChatRenderer = ({ value }) => {
    const { title } = value;
    const [username, setUsername] = useState("Guest");
    const [chats, setChats] = useState([]);
    const [chatCount, setChatCount] = useState(null);
    const [fetchStatus, setFetchStatus] = useState("default");
    const toFetch = 20;
    const [fetchSpan, setFetchSpan] = useState({ start: 0, end: toFetch });
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [chatAlert, setChatAlert] = useState(false);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    // const [usersRemoved, setUsersRemoved] = useState([]);
    const chatboxRef = useRef(null);

    const chatQuery =
        '*[_type == "comments" && visible]| order(_createdAt desc)[$start..$end] {name, message, publishedAt}';

    const chatCountQuery = 'count(*[_type == "comments" && visible])';

    const pusher = useMemo(() => {
        const pusherInit = new Pusher(process.env.GATSBY_PUSHER_KEY, {
            cluster: process.env.GATSBY_PUSHER_CLUSTER,
            authEndpoint: "/api/auth",
            auth: { params: { username } },
        });
        return pusherInit;
    }, [username]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const channel = pusher.subscribe("presence-channel");

            // member subscribes to channel
            channel.bind("pusher:subscription_succeeded", (members) =>
                setOnlineUsersCount(members.count)
            );

            // member joins chat
            channel.bind("pusher:member_added", (member) => {
                setOnlineUsersCount(channel.members.count);
            });

            // member leaves chat
            channel.bind("pusher:member_removed", (member) => {
                setOnlineUsersCount(channel.members.count);
            });

            // new chat updates
            // channel.bind("chat-update", function (data) {
            //     const { username, message, date } = data;
            //     setChats((prevState) => [...prevState, { username, message, date }]);
            // });
        }

        return () => {
            mounted = false;
            pusher.unsubscribe("presence-channel");
        };
    }, []);

    // Fetch old chats
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            client
                .fetch(
                    `{
                    "chatList": ${chatQuery},
                    "chatCountQuery": ${chatCountQuery},
                    }`,
                    { start: fetchSpan.start, end: fetchSpan.end }
                )
                .then((chats) => {
                    setChatCount(chats.chatCountQuery);
                    setChats(chats.chatList);
                });
        }
        return () => (mounted = false);
    }, []);

    // Fetch older chats on request
    useEffect(() => {
        let mounted = true;
        if (mounted && fetchStatus === "fetching") {
            client
                .fetch(chatQuery, { start: fetchSpan.start, end: fetchSpan.end })
                .then((chats) => {
                    setFetchStatus("default");
                    setChats((oldArray) => [...oldArray, ...chats]);
                });
        }
        return () => (mounted = false);
    }, [fetchSpan]);

    // Listen for chat updates
    useEffect(() => {
        const query = '*[_type == "comments"]';
        const subscription = client.listen(query).subscribe((update) => {
            const { name, message, publishedAt } = update.result;
            const newMessage = { message: message, name: name, publishedAt: publishedAt };
            setChats((prevArray) => [newMessage, ...prevArray]);
            setChatCount((prevState) => prevState + 1);
            triggerAlert();
        });
        return () => subscription.unsubscribe();
    }, []);

    const scrollToTop = () => {
        chatboxRef.current.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const triggerAlert = () => {
        if (chatboxRef.current.scrollTop !== 0) {
            setChatAlert(true);
        }
    };

    const variants = {
        hidden: { bottom: 0 },
        visible: { bottom: -50 },
    };

    const updateFetchSpan = () => {
        setFetchStatus("fetching");
        setFetchSpan((prevState) => {
            return { start: prevState.end + 1, end: prevState.end + toFetch + 1 };
        });
    };

    return (
        <div className={style.grid}>
            <div className={style.chat}>
                <div className={style.header}>
                    <div className={style.title}>{title}</div>
                    <div className={style.status}>
                        {onlineUsersCount} USER{onlineUsersCount === 1 ? "" : "S"} ONLINE
                    </div>
                    <ChatRendererInput
                        username={username}
                        setUsername={setUsername}
                        setErrorMessage={setErrorMessage}
                    />
                    <span>{errorMessage}</span>
                    <div className={style.chatAlertMask}></div>
                    <motion.div
                        className={style.chatAlert}
                        initial="hidden"
                        animate={chatAlert ? "visible" : "hidden"}
                        variants={variants}
                    >
                        <button
                            onClick={() => {
                                scrollToTop();
                                setChatAlert(false);
                            }}
                        >
                            New messages
                        </button>
                    </motion.div>
                </div>
                <div className={style.chatbox} ref={chatboxRef}>
                    {chats.map((chat, index) => {
                        return <ChatRendererComment key={index} chat={chat} />;
                    })}
                    {chats.length > 0 && chats.length !== chatCount && (
                        <button
                            className={style.load}
                            onClick={updateFetchSpan}
                            aria-label="Load more past events"
                            disabled={fetchStatus === "default" ? false : true}
                        >
                            {fetchStatus === "default" ? (
                                <span>Load more...</span>
                            ) : (
                                <span className={style.spinner}></span>
                            )}
                        </button>
                    )}
                </div>
                {chats.length === 0 && (
                    <div className={style.loader}>
                        <span>
                            Loading Messages <span className={style.spinner}></span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatRenderer;

import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import * as style from "./chat.module.css";

const ChatRenderer = ({ value }) => {
    console.log(value);
    const [username, setUsername] = useState("Guest");
    const [chats, setChats] = useState([]);
    const [messageToSend, setMessageToSend] = useState("");
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    // const [usersRemoved, setUsersRemoved] = useState([]);

    const pusher = new Pusher(process.env.GATSBY_PUSHER_KEY, {
        cluster: "eu",
        authEndpoint: "/api/auth",
        auth: { params: { username } },
    });

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const channel = pusher.subscribe("presence-channel");

            // new member subscription to channel
            channel.bind("pusher:subscription_succeeded", (members) => {
                setOnlineUsersCount(members.count);
            });

            // member joining chat
            channel.bind("pusher:member_added", (member) => {
                setOnlineUsersCount(channel.members.count);
                // setOnlineUsers((prevState) => [
                //     ...prevState,
                //     { username: member.info.username, userLocation: member.info.userLocation },
                // ]);
            });

            // member leaves chat
            channel.bind("pusher:member_removed", (member) => {
                setOnlineUsersCount(channel.members.count);
                // setUsersRemoved((prevState) => [...prevState, member.info.username]);
            });

            // new chat updates
            channel.bind("chat-update", function (data) {
                const { username, message, date } = data;
                setChats((prevState) => [...prevState, { username, message, date }]);
            });
        }

        return () => {
            mounted = false;
            pusher.unsubscribe("presence-channel");
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/chat", {
                message: messageToSend,
                username,
                date: new Date(),
            });
            setMessageToSend("");
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div className={style.grid}>
            <div className={style.chat}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="username">Name</label>
                    <br />
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="your name"
                        defaultValue="Guest"
                        id="username"
                    />
                    <br />
                    <label htmlFor="message">Message</label>
                    <br />
                    <input
                        type="text"
                        value={messageToSend}
                        onChange={(e) => setMessageToSend(e.target.value)}
                        placeholder="Start typing...."
                        id="message"
                    />
                    <button type="submit">Send</button>
                </form>
                <h3>{value.title}</h3>
                <div>
                    {onlineUsersCount} user{onlineUsersCount === 1 ? "" : "s"} online now
                </div>
                {chats.map((chat, id) => {
                    const options = {
                        weekday: "long",
                        year: "2-digit",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    };
                    const date = new Date(chat.date).toLocaleDateString("en-GB", options);
                    return (
                        <div key={id}>
                            <p>
                                <strong>{chat.username}</strong>
                                <span> {chat.message}</span>
                            </p>
                            <small>{date}</small>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatRenderer;

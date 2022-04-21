import React, { useState, useEffect, useMemo } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import * as style from "./chat.module.css";
import { useForm } from "react-hook-form";
import ChatRendererComment from "./ChatRendererComment";

const sanityClient = require("@sanity/client");
const client = sanityClient({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-04-21",
    useCdn: false,
});

const ChatRenderer = ({ value }) => {
    const [username, setUsername] = useState("Guest");
    const [chats, setChats] = useState([]);
    const [onlineUsersCount, setOnlineUsersCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    // const [onlineUsers, setOnlineUsers] = useState([]);
    // const [usersRemoved, setUsersRemoved] = useState([]);

    const chatQuery =
        '*[_type == "comments" && visible]| order(_createdAt asc)[0..29] {name, message, publishedAt}';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

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
        if (mounted) client.fetch(chatQuery).then((comments) => setChats(comments));
        return () => (mounted = false);
    }, []);

    // Listen for chat updates
    useEffect(() => {
        const query = '*[_type == "comments"]';

        const subscription = client.listen(query).subscribe((update) => {
            const { name, message, publishedAt } = update.result;
            const newMessage = { message: message, name: name, publishedAt: publishedAt };
            setChats((prevArray) => [...prevArray, newMessage]);
        });

        return () => subscription.unsubscribe();
    }, []);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setUsername(data.username);
        setErrorMessage("");
        try {
            // await axios.post("/api/chat", {
            //     message: data.message,
            //     username,
            //     date: new Date(),
            // });
            await axios.post("/api/submit", {
                message: data.message,
                username,
                date: new Date(),
            });
            reset();
        } catch (err) {
            console.error(err.message);
            setErrorMessage("Sorry, there was an error sending your message. Please try again.");
        }
    };

    return (
        <div className={style.grid}>
            <div className={style.chat}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        label="Name"
                        defaultValue={username}
                        {...register("username", { required: true, maxLength: 20 })}
                    />
                    {errors.name?.type === "required" && <span>A name is required.</span>}
                    {errors.name?.type === "maxLength" && (
                        <span>Your name can be a maximum of 20 characters.</span>
                    )}

                    <input
                        label="Message"
                        {...register("message", { required: true, maxLength: 50 })}
                    />
                    {errors.message?.type === "required" && <span>A message is required.</span>}
                    {errors.message?.type === "maxLength" && (
                        <span>Your message can be a maximum of 50 characters.</span>
                    )}

                    <input type="submit" value="Send Message" />
                </form>
                <span>{errorMessage}</span>
                <h3>{value.title}</h3>
                <div>
                    {onlineUsersCount} user{onlineUsersCount === 1 ? "" : "s"} online now
                </div>
                <div className={style.chatBox}>
                    {chats.map((chat, index) => {
                        return <ChatRendererComment key={index} chat={chat} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default ChatRenderer;

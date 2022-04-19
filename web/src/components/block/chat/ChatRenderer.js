import React, { useState } from "react";
import Pusher from "pusher-js";
import slugify from "slugify";
import * as style from "./chat.module.css";

const ChatRenderer = ({ value }) => {
    const [message, setMessage] = useState("");
    const pusher = new Pusher("697e15716cd63c88c880", {
        authEndpoint: "http://localhost:8888/.netlify/functions/server",
        cluster: "eu",
        encrypted: true,
    });

    const channel1 = pusher.subscribe("my-channel-1");

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            by: "Simon",
            body: message,
            time: new Date(),
        };

        channel1.trigger("client-on-message", newMessage);
        setMessage("");
    };

    return (
        <div className={style.grid}>
            <div className={style.chat}>
                <form onSubmit={(e) => onSubmit(e)}>
                    <label for="fname">Message:</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Type your message here.."
                        onChange={(e) => handleChange(e)}
                    />
                    <br />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    );
};

export default ChatRenderer;

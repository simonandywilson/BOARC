import React from "react";
import * as style from "./comment.module.css";
import TimeAgo from "react-timeago";

const ChatRendererComment = ({ chat }) => {
    // const options = {
    //     weekday: "long",
    //     year: "2-digit",
    //     month: "numeric",
    //     day: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //     second: "numeric",
    // };
    // const date = new Date(chat.publishedAt).toLocaleDateString("en-GB", options);
    return (
        <div className={style.comment}>
            <div>
                <span className={style.name}>{chat.name}</span>{" "}
                <span className={style.message}>{chat.message}</span>
            </div>
            {/* <small className={style.date}>{date}</small> */}
            <TimeAgo className={style.date} date={chat.publishedAt} />
        </div>
    );
};

export default ChatRendererComment;

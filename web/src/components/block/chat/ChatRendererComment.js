import React from "react";
import * as style from "./comment.module.css";
import TimeAgo from "react-timeago";

const ChatRendererComment = ({ chat }) => {
    return (
        <div className={style.comment}>
            <div>
                <span className={style.name}>{chat.name}</span>{" "}
                <span className={style.message}>{chat.message}</span>
            </div>
            <TimeAgo className={style.date} date={chat.publishedAt} />
        </div>
    );
};

export default ChatRendererComment;

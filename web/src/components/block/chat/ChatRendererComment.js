import React from 'react'
import * as style from "./chat.module.css"

const ChatRendererComment = ({ chat }) => {
    const options = {
        weekday: "long",
        year: "2-digit",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    const date = new Date(chat.publishedAt).toLocaleDateString("en-GB", options);
  return (
      <div>
          <p>
              <strong>{chat.name}</strong>
              <span> {chat.message}</span>
          </p>
          <small>{date}</small>
      </div>
  );
}

export default ChatRendererComment
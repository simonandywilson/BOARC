import React from "react";
import * as style from "./input.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const ChatRendererInput = ({ username, setUsername, setErrorMessage }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault();
        setUsername(data.username);
        setErrorMessage("");
        try {
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
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <input
                label="Name"
                type="text"
                defaultValue={username}
                {...register("username", { required: true, maxLength: 20 })}
                className={style.input}
            />
            {errors.name?.type === "required" && (
                <span className={style.error}>A name is required.</span>
            )}
            {errors.name?.type === "maxLength" && (
                <span className={style.error}>Your name can be a maximum of 20 characters.</span>
            )}

            <input
                label="Message"
                type="text"
                {...register("message", { required: true, maxLength: 75 })}
                className={style.input}
                placeholder="Message…"
            />
            {errors.message?.type === "required" && (
                <span className={style.error}>A message is required.</span>
            )}
            {errors.message?.type === "maxLength" && (
                <span className={style.error}>Your message can be a maximum of 75 characters.</span>
            )}

            <input type="submit" value="Send Message" className={style.submit} />
        </form>
    );
};

export default ChatRendererInput;

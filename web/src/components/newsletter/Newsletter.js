import React, { useState, useEffect } from "react";
import * as style from "./newsletter.module.css";
import { graphql, useStaticQuery } from "gatsby";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";

const Newsletter = () => {
    const { newsletter } = useStaticQuery(getData);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [hidden, setHidden] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [formstatus, setFormstatus] = useState("default");

    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            await axios.post("/api/submit-subscriber", {
                date: new Date(),
                email: data.email,
            });
            reset();
            setFormstatus("complete");
        } catch (err) {
            console.error(err.message);
            setFormstatus("error");
        }
    };

    const variants = {
        visible: { x: 0 },
        hidden: { x: "100%" },
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisibility(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (formstatus === "complete") {
            const timer = setTimeout(() => {
                setVisibility(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [formstatus]);

    return (
        <motion.div
            style={{ display: hidden ? "none" : "block" }}
            animate={visibility ? "visible" : "hidden"}
            initial={"hidden"}
            variants={variants}
            transition={{
                default: { type: "tween" },
            }}
            className={style.newsletter}
        >
            <div className={style.wrapper}>
                {formstatus === "default" || formstatus === "error" ? (
                    <>
                        <div className={style.row}>
                            <div>{newsletter.text}</div>
                            <button className={style.close} onClick={() => setHidden(true)}>
                                X
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.row}>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    {...register("email", {
                                        required: true,
                                        pattern: /^\S+@\S+$/i,
                                    })}
                                    className={style.input}
                                />
                                <input type="submit" className={style.submit} />
                            </div>
                            {errors.email?.type === "required" && (
                                <p className={style.validation}>Please enter your email.</p>
                            )}
                            {errors.email?.type === "pattern" && (
                                <p className={style.validation}>
                                    Please enter your email in the correct format.
                                </p>
                            )}
                            {formstatus === "error" && (
                                <p className={style.validation}>
                                    Sorry, there was an error submitting your email. Please try
                                    again.
                                </p>
                            )}
                        </form>
                    </>
                ) : (
                    <div>Thank you!</div>
                )}
            </div>
        </motion.div>
    );
};

export default Newsletter;

const getData = graphql`
    {
        newsletter: sanityNewsletter {
            text
        }
    }
`;

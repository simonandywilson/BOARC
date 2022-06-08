import React, { useState } from "react";
import { Link } from "gatsby";
import * as style from "./list.module.css";
import { motion, AnimatePresence } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: "production",
});
const urlFor = (source) => builder.image(source);
const optionsDate = { day: "numeric", year: "numeric", month: "short" };
const dateFormat = new Intl.DateTimeFormat("en-GB", optionsDate);

const EventRendererListRow = ({ data, tense, width }) => {
    const [open, setOpen] = useState(false);

    const dateStart = new Date(data.start);
    const dateEnd = new Date(data.end);
    const formattedDate = dateFormat.formatRange(dateStart, dateEnd);

    return (
        <div
            className={style.grid}
            style={{ color: tense === "future" ? "var(--brown)" : "var(--red)" }}
        >
            <div
                className={style.row}
                style={{
                    gridColumn:
                        width === "wide"
                            ? "var(--grid-position-main-wide)"
                            : "var(--grid-position-main-normal)",
                }}
            >
                <div className={style.icon}>
                    <img
                        src={urlFor(data.icon).auto("format").fit("max").width(150).toString()}
                        alt="Event icon"
                        className={style.image}
                    />
                </div>
                <div>
                    <div className={style.details}>
                        <div
                            className={style.date}
                            style={{
                                textDecoration: tense === "future" ? "none" : "line-through",
                                marginRight: width === "wide" ? "var(--margin)" : 0,
                            }}
                        >
                            {formattedDate}
                        </div>
                        <div
                            className={style.title}
                            style={{
                                textDecoration: tense === "future" ? "none" : "line-through",
                            }}
                        >
                            {data.title}
                        </div>
                    </div>

                    <div className={style.content}>
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    className={style.description}
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                        open: { opacity: 1, height: "auto" },
                                        collapsed: { opacity: 0, height: 0 },
                                    }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {data.previewText}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className={style.links}>
                        {data.type === "internal" ? (
                            <Link
                                className={style.hyperlink}
                                to={`/${data.slug}`}
                                style={{
                                    color: tense === "future" ? "var(--brown)" : "var(--red)",
                                }}
                            >
                                visit event site
                            </Link>
                        ) : (
                            <a
                                href={data.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: tense === "future" ? "var(--brown)" : "var(--red)",
                                }}
                            >
                                visit external event site
                            </a>
                        )}
                        <button
                            className={style.dropdown}
                            onClick={() => setOpen((prevOpen) => !prevOpen)}
                            style={{
                                color: tense === "future" ? "var(--brown)" : "var(--red)",
                            }}
                        >
                            learn more
                        </button>
                    </div>
                    <span className={style.border}>{"-".repeat(100)}</span>
                </div>
            </div>
        </div>
    );
};

export default EventRendererListRow;

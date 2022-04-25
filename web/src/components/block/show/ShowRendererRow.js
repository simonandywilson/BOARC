import React, { useState } from "react";
import * as style from "./show.module.css";
import ReactPlayer from "react-player/file";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";

const ShowRendererRow = ({ width, show }) => {
    const [open, setOpen] = useState(false);
    const [playing, setPlaying] = useState(false);

    return (
        <div
            className={style.row}
            style={{
                gridColumn:
                    width === "wide"
                        ? "var(--grid-position-main-wide)"
                        : "var(--grid-position-main-normal)",
            }}
        >
            <ReactPlayer
                className={style.player}
                url={show.audio.asset.url}
                playing={playing ? true : false}
                loop={true}
                width={0}
                height={0}
            />
            <div className={style.icon}></div>
            <div className={style.details}>
                <div className={style.flex}>
                    <div className={style.heading}>
                        <div>
                            <span>{show.title}</span>
                            <br />
                            <span>{show.date}</span>
                        </div>
                        <button
                            className={style.play}
                            onClick={() => setPlaying((prevState) => !prevState)}
                        >
                            {playing ? "pause" : "play"}
                        </button>
                    </div>

                    <button
                        className={style.tracklist}
                        onClick={() => setOpen((prevState) => !prevState)}
                    >
                        Info+Tracklist
                    </button>
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className={style.info}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: "auto" },
                                collapsed: { opacity: 0, height: 0 },
                            }}
                            transition={{ duration: 0.25 }}
                        >
                            <PortableText value={show._rawInfo} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <span className={style.border}>{"-".repeat(100)}</span>
            </div>
        </div>
    );
};

export default ShowRendererRow;
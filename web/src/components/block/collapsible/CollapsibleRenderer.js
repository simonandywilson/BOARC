import React, { useState, useMemo } from "react";
import * as style from "./collapsible.module.css";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";
import TextRendererCollapsible from "./TextRendererCollapsible";

const CollapsibleRenderer = ({ value, width, background }) => {
    const [open, setOpen] = useState(false);

    const serialiser = useMemo(() => {
        const components = {
            block: (data) => <TextRendererCollapsible data={data} background={background} />,
        };
        return components;
    }, []);

    return (
        <div className={style.grid}>
            <div
                className={style.collapsible}
                style={{
                    gridColumn:
                        width === "wide"
                            ? "var(--grid-position-main-wide)"
                            : "var(--grid-position-main-normal)",
                }}
            >
                <div className={style.wrapper}>
                    <span className={style.icon}>{open ? "–" : "+"}&nbsp;</span>
                    <div className={style.content}>
                        <button
                            onClick={() => {
                                setOpen((prevState) => !prevState);
                            }}
                            className={style.button}
                        >
                            {value.title}
                        </button>
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    className={style.text}
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                        open: { opacity: 1, height: "auto" },
                                        collapsed: { opacity: 0, height: 0 },
                                    }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <PortableText value={value.text} components={serialiser} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollapsibleRenderer;

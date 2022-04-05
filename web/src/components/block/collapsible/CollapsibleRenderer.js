import React, { useState } from "react";
import * as style from "./collapsible.module.css";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";


const CollapsibleRenderer = ({ value, width }) => {
    const [open, setOpen] = useState(false);
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
                <button
                    onClick={() => {
                        setOpen((prevState) => !prevState);
                    }}
                    className={style.button}
                >
                    <span>{open ? "–" : "+"}</span> {value.title}
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
                            <PortableText value={value.text} components={components} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const components = {
    block: {
        normal: ({ children }) => <p>{children}</p>,
    },
};

export default CollapsibleRenderer;

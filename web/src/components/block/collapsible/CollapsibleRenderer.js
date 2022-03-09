import React, { useState } from "react";
import * as style from "./collapsible.module.css";
import { PortableText } from "@portabletext/react";

const CollapsibleRenderer = ({ value }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={style.grid}>
            <div className={style.collapsible}>
                <button
                    onClick={() => {
                        setOpen((prevState) => !prevState);
                    }}
                    className={style.button}
                >
                    <span>{open ? "–" : "+"}</span> {value.title}
                </button>
                <div style={{ display: open ? "block" : "none" }} className={style.text}>
                    <PortableText value={value.text} components={components} />
                </div>
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

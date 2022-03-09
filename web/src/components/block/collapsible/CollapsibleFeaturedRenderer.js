import React, { useState } from "react";
import * as style from "./collapsible.module.css";
import { PortableText } from "@portabletext/react";

const CollapsibleFeaturedRenderer = ({ value }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={style.grid}>
            <div className={style.collapsible}>
                <div className={style.featured}>
                    <div className={style.icon}>?</div>
                    <div>
                        <div>{value.title}</div>
                        <button
                            onClick={() => {
                                setOpen((prevState) => !prevState);
                            }}
                            className={style.button}
                        >
                            <span className={style.read}>{open ? "–" : "+"} read more</span>
                        </button>
                    </div>
                </div>
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

export default CollapsibleFeaturedRenderer;

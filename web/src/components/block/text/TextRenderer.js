import React from "react";
import * as style from "./text.module.css";
import { PortableText } from "@portabletext/react";

const TextRenderer = ({ children }) => {
    const hasComment = children[0]?.props?.markType === "blockComment" ? true : false;

    return (
        <div className={style.grid}>
            {hasComment && children[0]?.props?.value?.comment && (
                <div className={style.comment}>
                    <PortableText value={children[0].props.value.comment} components={components} />
                </div>
            )}
            <p className={style.text}>{children}</p>
        </div>
    );
};

const components = {
    block: {
        normal: ({ children }) => <p>{children}</p>,
    },
};

export default TextRenderer;

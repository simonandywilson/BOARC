import React from "react";
import * as style from "./text.module.css";
import { PortableText } from "@portabletext/react";

const TextRenderer = (data) => {
    const { children, value } = data.data;

    const hasComment = children[0]?.props?.markType === "blockComment" ? true : false;

    const format = (text) => {
        switch (value.style) {
            case "heading":
                return <h3 className={style.heading}>{text}</h3>;

            default:
                return <p className={style.normal}>{text}</p>;
        }
    };

    return (
        <div className={style.grid}>
            {hasComment && children[0]?.props?.value?.comment ? (
                <>
                    <div className={style.comment}>
                        <PortableText
                            value={children[0].props.value.comment}
                            components={components}
                        />
                    </div>
                    {format(children[0].props.text)}
                </>
            ) : (
                format(children)
            )}
        </div>
    );
};

const components = {
    block: {
        normal: ({ children }) => <p>{children}</p>,
    },
};

export default TextRenderer;

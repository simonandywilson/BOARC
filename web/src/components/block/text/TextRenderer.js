import React from "react";
import * as style from "./text.module.css";
import { PortableText } from "@portabletext/react";

const TextRenderer = ({ data, width }) => {
    const { children, value } = data;

    const hasComment = children[0]?.props?.markType === "blockComment" ? true : false;

    const format = (text) => {
        switch (value.style) {
            case "subheading":
                return (
                    <h3
                        className={style.subheading}
                        style={{
                            gridColumn: "var(--grid-position-main-wide)",
                        }}
                    >
                        {text}
                    </h3>
                );

            case "centered":
                return (
                    <p
                        className={style.centered}
                        style={{
                            gridColumn:
                                width === "wide"
                                    ? "var(--grid-position-main-wide)"
                                    : "var(--grid-position-main-normal)",
                        }}
                    >
                        {text}
                    </p>
                );

            case "indent":
                return (
                    <p
                        className={style.indent}
                        style={{
                            gridColumn:
                                width === "wide"
                                    ? "var(--grid-position-main-wide)"
                                    : "var(--grid-position-main-normal)",
                        }}
                    >
                        {text}
                    </p>
                );

            default:
                return (
                    <p
                        className={style.normal}
                        style={{
                            gridColumn:
                                width === "wide"
                                    ? "var(--grid-position-main-wide)"
                                    : "var(--grid-position-main-normal)",
                        }}
                    >
                        {text}
                    </p>
                );
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

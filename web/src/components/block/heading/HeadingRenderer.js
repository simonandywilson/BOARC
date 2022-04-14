import React from "react";
import * as style from "./heading.module.css";
const slugify = require("slugify");

const HeadingRenderer = ({ data, width }) => {
    const { value } = data;
    return (
        <div className={style.grid}>
            <span
                id={slugify(value.heading, {
                    lower: true,
                })}
                className={style.anchor}
            ></span>
            <h2
                className={style.heading}
                style={{
                    gridColumn:
                        width === "wide"
                            ? "var(--grid-position-main-wide)"
                            : "var(--grid-position-main-normal)",
                }}
            >
                <span>{value.border.borderTop.repeat(200)}</span>
                {value.heading}
                <span>{value.border.borderBottom.repeat(200)}</span>
            </h2>
        </div>
    );
};

export default HeadingRenderer;

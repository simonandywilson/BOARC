import React from "react";
import * as style from "./heading.module.css";
const slugify = require("slugify");

const HeadingRenderer = ({ value }) => {
    return (
        <div className={style.grid}>
            <span
                id={slugify(value.heading, {
                    lower: true,
                })}
                className={style.anchor}
            ></span>
            <h2 className={style.heading}>
                <span>{value.border.borderTop.repeat(100)}</span>
                {value.heading}
                <span>{value.border.borderBottom.repeat(100)}</span>
            </h2>
        </div>
    );
};

export default HeadingRenderer;

import React, { useLayoutEffect, useRef } from "react";
import * as style from "./heading.module.css";
import { useInView } from "react-intersection-observer";
import slugify from "slugify";
import { useSubheadingUpdateContext } from "../../../state/GlobalState";

const HeadingRenderer = ({ data, width }) => {
    const { value } = data;
    const { ref, inView } = useInView();
    const firstUpdate = useRef(true);
    const SubheadingUpdateContext = useSubheadingUpdateContext();
    const slug = slugify(value.heading, {
        lower: true,
    });

    const colour = value.colour?.value && value.colour?.value === "#ed6b6c" ? "var(--red)" : "var(--font-colour)"

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        SubheadingUpdateContext(slug);
    }, [inView]);

    return (
        <div className={style.grid}>
            <span id={slug} className={style.anchor}></span>
            <h2
                className={style.heading}
                ref={ref}
                style={{
                    color: colour,
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

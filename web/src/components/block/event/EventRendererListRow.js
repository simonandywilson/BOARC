import React, { useState } from "react";
import { Link } from "gatsby";
import * as style from "./list.module.css";

const EventRendererListRow = ({ data, tense }) => {
    const options = { day: "numeric", year: "numeric", month: "short" };
    const date = new Date(data.start).toLocaleDateString("en-GB", options);
    const [toggle, setToggle] = useState(false);
    return (
        <div
            className={style.row}
            style={{ color: tense === "future" ? "var(--brown)" : "var(--red)" }}
        >
            <div className={style.icon}></div>
            <div
                className={style.date}
                style={{ textDecoration: tense === "future" ? "none" : "line-through" }}
            >
                {date}
            </div>
            <div className={style.content}>
                <div style={{ textDecoration: tense === "future" ? "none" : "line-through" }}>
                    {data.title}
                </div>
                <div className={style.description} style={{ display: toggle ? "block" : "none" }}>
                    {data.previewText}
                </div>
            </div>
            <div className={style.details}>
                <div className={style.links}>
                    <Link
                        className={style.hyperlink}
                        to={`/${data.slug}`}
                        style={{ color: tense === "future" ? "var(--brown)" : "var(--red)" }}
                    >
                        visit event site
                    </Link>
                    <button
                        className={style.dropdown}
                        onClick={() => setToggle((prevToggle) => !prevToggle)}
                        style={{ color: tense === "future" ? "var(--brown)" : "var(--red)" }}
                    >
                        learn more
                    </button>
                </div>
                <div className={style.border}>{"-".repeat(100)}</div>
            </div>
        </div>
    );
};

export default EventRendererListRow;

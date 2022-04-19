import React from "react";
import { Link } from "gatsby";
import * as style from "./primary.module.css";

const Primary = ({ title, slug, isActive, isLast }) => {
    return (
        <div className={style.primary}>
            <Link to={`/${slug}`}>
                <span
                    style={{
                        color: isActive ? "var(--purple)" : "var(--brown)",
                        textDecoration: isActive ? "underline" : "none",
                    }}
                >
                    {title}
                </span>
            </Link>

            {!isLast && <span className={style.divider}>&nbsp;|&nbsp;</span>}
        </div>
    );
};

export default Primary;

import React from "react";
import { Link } from "gatsby";
import * as style from "./primary.module.css";

const Primary = ({ title, items, landing, isMulti, isActiveMulti, isActiveSingular, isLast }) => {
    return (
        <div className={style.primary}>
            {isMulti ? (
                <Link to={`/${landing.slug.current}`}>
                    <span
                        style={{
                            color: isActiveMulti ? "var(--purple)" : "var(--brown)",
                            textDecoration: isActiveMulti ? "underline" : "none",
                        }}
                    >
                        {title}
                    </span>
                </Link>
            ) : (
                <Link to={`/${items[0].slug.current}`}>
                    <span
                        style={{
                            color: isActiveSingular ? "var(--purple)" : "var(--brown)",
                            textDecoration: isActiveSingular ? "underline" : "none",
                        }}
                    >
                        {title}
                    </span>
                </Link>
            )}
            {!isLast && <span className={style.divider}>&nbsp;|&nbsp;</span>}
        </div>
    );
};

export default Primary;

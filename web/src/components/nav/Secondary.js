import React from "react";
import { Link } from "gatsby";
import * as style from "./secondary.module.css";
import scrollTo from "gatsby-plugin-smoothscroll";
const slugify = require("slugify");

const Secondary = ({ items, isMulti, isActiveMulti, isActiveSingular, singular, active }) => {
    return isMulti ? (
        <div
            className={style.secondary}
            style={{
                // visibility: isActiveMulti ? "visible" : "hidden",
                display: isActiveMulti ? "block" : "none",
            }}
        >
            {items.map((item, index) => {
                return (
                    <React.Fragment key={item._id + index}>
                        <Link to={`/${item.slug.current}`}>
                            <span
                                style={{
                                    textDecoration:
                                        `/${item.slug.current}` === active ? "underline" : "none",
                                }}
                            >
                                {item.title}
                            </span>
                        </Link>
                        {index !== items.length - 1 && (
                            <span className={style.divider}>&nbsp;|&nbsp;</span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    ) : (
        <div
            className={style.secondary}
            style={{
                // visibility: isActiveSingular ? "visible" : "hidden",
                display: isActiveSingular ? "block" : "none",
            }}
        >
            {singular.map((tab, index) => {
                return (
                    <React.Fragment key={tab._key}>
                        <button
                            onClick={() =>
                                scrollTo(
                                    `#${slugify(tab.heading, {
                                        lower: true,
                                    })}`
                                )
                            }
                        >
                            {tab.heading}
                        </button>
                        {index !== singular.length - 1 && (
                            <span className={style.divider}>,&nbsp;</span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Secondary;

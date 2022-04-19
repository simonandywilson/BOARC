import React from "react";
import { Link } from "gatsby";
import * as style from "./secondary.module.css";

const SecondaryLink = ({ items, isActive, active }) => {
    return (
        <div
            className={style.secondary}
            style={{
                display: isActive ? "block" : "none",
            }}
        >
            {items.map((link, index) => {
                return (
                    <React.Fragment key={link._id + index}>
                        <Link to={`/${link.slug.current}`}>
                            <span
                                style={{
                                    textDecoration:
                                        `${link.slug.current}` === active ? "underline" : "none",
                                }}
                            >
                                {link.title}
                            </span>
                        </Link>
                        {index !== items.length - 1 && (
                            <span className={style.divider}>&nbsp;|&nbsp;</span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default SecondaryLink;

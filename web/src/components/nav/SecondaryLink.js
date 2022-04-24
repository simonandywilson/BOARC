import React from "react";
import { Link } from "gatsby";
import * as style from "./secondaryLink.module.css";
import { nanoid } from "nanoid";

const SecondaryLink = ({ items, isActive, active }) => {
    return (
        <div
            className={style.wrapper}
            style={{
                display: isActive ? "flex" : "none",
            }}
        >
            {items.map((link, index) => {
                return (
                    <div className={style.secondary} key={nanoid()}>
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
                    </div>
                );
            })}
        </div>
    );
};

export default SecondaryLink;

import React from "react";
import { Link } from "gatsby";
import * as style from "./secondaryLink.module.css";
import { nanoid } from "nanoid";

const NavPortraitSecondaryLink = ({ items, active, columns, isActive }) => {
    return items.map((link) => {
        const title = link.title.length > columns ? [..."HECS"] : [...link.title];
        const dotsStart = Math.max(0, Math.floor((columns - title.length) / 2));
        const dotsEnd = Math.max(0, Math.ceil((columns - title.length) / 2));
        return (
            <div
                className={style.row}
                style={{
                    
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
                key={nanoid()}
            >
                {[...Array(dotsStart)].map(() => (
                    <span key={nanoid()}>.</span>
                ))}
                <div
                    className={style.text}
                    style={{
                        gridColumn: `${dotsStart + 1} / span ${title.length}`,
                        textDecoration: `${link.slug.current}` === active ? "underline" : "none",
                    }}
                >
                    <Link to={`/${link.slug.current}`}>
                        <span
                            style={{
                                gridTemplateColumns: `repeat(${title.length}, 1fr)`,
                            }}
                        >
                            {title.map((text) => (
                                <span key={nanoid()}>{text}</span>
                            ))}
                        </span>
                    </Link>
                </div>
                {[...Array(dotsEnd)].map(() => (
                    <span key={nanoid()}>.</span>
                ))}
            </div>
        );
    });
};

export default NavPortraitSecondaryLink;
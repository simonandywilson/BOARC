import React from "react";
import * as style from "./secondaryTab.module.css";
import scrollTo from "gatsby-plugin-smoothscroll";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { useSubheadingContext } from "../../state/GlobalState";

const SecondaryTab = ({ items, columns, isActive }) => {
    const tabs = items[0]._rawContent?.filter((type) => type._type === "blockHeading");
    const SubheadingContext = useSubheadingContext();

    return tabs.map((tab) => {
        const slug = slugify(tab.heading, {
            lower: true,
        });
        const title = [...tab.heading];
        console.log(tab.heading);
        const dotsStart = Math.max(0, Math.floor((columns - title.length) / 2));
        const dotsEnd = Math.max(0, Math.ceil((columns - title.length) / 2));
        return (
            <div
                className={style.row}
                style={{
                    display: isActive ? "grid" : "none",
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
                    }}
                >
                    <button
                        onClick={() => scrollTo(`#${slug}`)}
                        style={{
                            textDecoration: slug === SubheadingContext ? "underline" : "none",
                            gridTemplateColumns: `repeat(${title.length}, 1fr)`,
                        }}
                    >
                        {title.map((text) => (
                            <span key={nanoid()}>{text}</span>
                        ))}
                    </button>
                </div>
                {[...Array(dotsEnd)].map(() => (
                    <span key={nanoid()}>.</span>
                ))}
            </div>
        );
    });
};

export default SecondaryTab;

import React from "react";
import * as style from "./secondaryTab.module.css";
import scrollTo from "gatsby-plugin-smoothscroll";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { useSubheadingContext } from "../../state/GlobalState";

const SecondaryTab = ({ items, isActive }) => {
    const tabs = items[0]._rawContent?.filter((type) => type._type === "blockHeading");
    const SubheadingContext = useSubheadingContext();
    return (
        <div
            className={style.wrapper}
            style={{
                display: isActive ? "flex" : "none",
            }}
        >
            {tabs.map((tab, index) => {
                const slug = slugify(tab.heading, {
                    lower: true,
                });
                return (
                    <div className={style.secondary} key={nanoid()}>
                        <button
                            onClick={() => scrollTo(`#${slug}`)}
                            style={{
                                textDecoration: slug === SubheadingContext ? "underline" : "none",
                            }}
                        >
                            {tab.heading}
                        </button>
                        {index !== tabs.length - 1 && (
                            <span className={style.divider}>,&nbsp;</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SecondaryTab;

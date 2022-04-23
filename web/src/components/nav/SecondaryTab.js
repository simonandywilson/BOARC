import React from "react";
import * as style from "./secondaryTab.module.css";
import scrollTo from "gatsby-plugin-smoothscroll";
import slugify from "slugify";

const SecondaryTab = ({ items, isActive }) => {
    const tabs = items[0]._rawContent?.filter((type) => type._type === "blockHeading");
    return (
        <div
            className={style.wrapper}
            style={{
                display: isActive ? "flex" : "none",
            }}
        >
            {tabs.map((tab, index) => {
                return (
                    <div className={style.secondary} key={tab._key}>
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

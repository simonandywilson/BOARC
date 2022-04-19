import React from "react";
import * as style from "./secondary.module.css";
import scrollTo from "gatsby-plugin-smoothscroll";
const slugify = require("slugify");

const SecondaryTab = ({ items, isActive }) => {
    const tabs = items[0]._rawContent?.filter((type) => type._type === "blockHeading");
    return (
        <div
            className={style.secondary}
            style={{
                display: isActive ? "block" : "none",
            }}
        >
            {tabs.map((tab, index) => {
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
                        {index !== tabs.length - 1 && (
                            <span className={style.divider}>,&nbsp;</span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default SecondaryTab;

import React from "react";
import * as style from "./decoration.module.css";
import Image from "gatsby-plugin-sanity-image";

const DecorationRenderer = ({ value }) => {
    const { position, reference } = value;
    return (
        <div className={style.grid}>
            {position === "left" && (
                <div className={style.decorationLeft}>
                    {reference?.image && (
                        <Image {...reference.image} alt="" className={style.image} />
                    )}
                </div>
            )}
            {position === "right" && (
                <div className={style.decorationRight}>
                    {reference?.image && (
                        <Image {...reference.image} alt="" className={style.image} />
                    )}
                </div>
            )}
        </div>
    );
};

export default DecorationRenderer;

import React from "react";
import * as style from "./decoration.module.css";
import Image from "gatsby-plugin-sanity-image";

const DecorationRenderer = ({ value }) => {
    const { position, reference } = value;
    return (
        <div className={style.grid}>
            {position === "left" && (
                <div className={style.decorationLeft}>
                    <div>
                        {reference?.image && (
                            <Image
                                {...reference.image}
                                alt=""
                                className={style.image}
                                width={200}
                                config={{ quality: 50, fit: "max", auto: "format" }}
                            />
                        )}
                    </div>
                </div>
            )}
            {position === "right" && (
                <div className={style.decorationRight}>
                    <div>
                        {reference?.image && (
                            <Image
                                {...reference.image}
                                alt=""
                                className={style.image}
                                width={200}
                                config={{ quality: 50, fit: "max", auto: "format" }}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DecorationRenderer;

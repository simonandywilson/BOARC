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
                                width={300}
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
                                width={300}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DecorationRenderer;

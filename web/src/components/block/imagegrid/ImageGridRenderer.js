import React from "react";
import * as style from "./imagegrid.module.css";
import Image from "gatsby-plugin-sanity-image";

const ImageGridRenderer = ({ value }) => {
    const tinted = value.type
    return (
        <div className={style.grid}>
            <div className={style.imagegrid}>
                {value.image.map((item) => {
                    const left = randomIntFromInterval(0, 14);
                    const top = randomIntFromInterval(0, 14);
                    return (
                        <div className={style.square} key={item._key}>
                            <div
                                className={style.wrapper}
                                style={{ left: `${left}%`, top: `${top}%` }}
                            >
                                {tinted === "tinted" && <div className={style.overlay}></div>}
                                <Image
                                    {...item}
                                    className={style.image}
                                    alt={item?.alt ? item.alt : "Unknown image"}
                                    width={500}
                                    style={{
                                        mixBlendMode: tinted === "tinted" ? "multiply" : "unset",
                                        "--filter": tinted === "tinted" ? "grayscale(100%) contrast(1)" : "unset"
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default ImageGridRenderer;

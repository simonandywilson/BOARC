import React from "react";
import Image from "gatsby-plugin-sanity-image";
import * as style from "./image.module.css";
import { PortableText } from "@portabletext/react";

const ImageRenderer = ({ data, isFirst }) => {
    const image = data.value;
    const type = isFirst ? (
        <Image
            {...image}
            className={style.image}
            alt={image?.alt ? image.alt : "Unknown image"}
            width={1000}
            loading="eager"
        />
    ) : (
        <Image
            {...image}
            className={style.image}
            alt={image?.alt ? image.alt : "Unknown image"}
            width={1000}
        />
    );

    return (
        <div className={style.grid}>
            {"caption" in image ? (
                <>
                    <div className={style.caption}>
                        <PortableText value={image.caption} components={components} />
                    </div>
                    <div className={style.small}>
                        <div className={style.overlay}></div>
                        {type}
                    </div>
                </>
            ) : (
                <div className={style.large}>
                    <div className={style.overlay}></div>
                    {type}
                </div>
            )}
        </div>
    );
};

const components = {
    block: {
        normal: ({ children }) => <p>{children}</p>,
    },
};

export default ImageRenderer;

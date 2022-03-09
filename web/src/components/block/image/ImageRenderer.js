import React from "react";
import Image from "gatsby-plugin-sanity-image";
import * as style from "./image.module.css";
import { PortableText } from "@portabletext/react";

const ImageRenderer = ({ value }) => {
    console.log(value);
    return (
        <div className={style.grid}>
            {"caption" in value ? (
                <>
                    <div className={style.caption}>
                        <PortableText value={value.caption} components={components} />
                    </div>
                    <div className={style.small}>
                        <div className={style.overlay}></div>
                        <Image
                            {...value}
                            className={style.image}
                            alt={value.alt}
                            width={1000}
                        />
                    </div>
                </>
            ) : (
                <div className={style.large}>
                    <div className={style.overlay}></div>
                    <Image {...value} className={style.image} alt={value.alt} width={1000} />
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

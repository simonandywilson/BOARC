import React, {useRef} from "react";
import Image from "gatsby-plugin-sanity-image";
import * as style from "./image.module.css";
import { PortableText } from "@portabletext/react";

const ImageRenderer = ({ value }) => {
    const image = value
    delete image.asset.metadata;
    return (
        <div className={style.grid}>
            {"caption" in image ? (
                <>
                    <div className={style.caption}>
                        <PortableText value={image.caption} components={components} />
                    </div>
                    <div className={style.small}>
                        <div className={style.overlay}></div>
                        <Image
                            {...image}
                            className={style.image}
                            alt={image?.alt ? image.alt : "Unknown image"}
                            width={500}
                            test="next"
                        />
                    </div>
                </>
            ) : (
                <div className={style.large}>
                    <div className={style.overlay}></div>
                    <Image
                        {...image}
                        className={style.image}
                        alt={image?.alt ? image.alt : "Unknown image"}
                        width={1000}
                    />
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

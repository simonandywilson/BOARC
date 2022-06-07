import React from "react";
import Image from "gatsby-plugin-sanity-image";
import * as style from "./image.module.css";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: "production",
});
const urlFor = (source) => builder.image(source);

const ImageRenderer = ({ data }) => {
    const isFirst = false
    const image = data.value;
    const type = isFirst ? (
        <img
            src={urlFor(image.asset.id).auto("format").fit("max").width(1500).toString()}
            alt={image.alt ? image.alt : ""}
            className={style.image}
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

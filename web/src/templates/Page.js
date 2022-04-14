import React, { useEffect, useMemo } from "react";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import Image from "gatsby-plugin-sanity-image";
import * as style from "./page.module.css";
import {
    useColoursContext,
    useColoursUpdateContext,
    useAsciiUpdateContext,
} from "../state/GlobalState";

import TextRenderer from "../components/block/text/TextRenderer";
import HeadingRenderer from "../components/block/heading/HeadingRenderer";
import ImageRenderer from "../components/block/image/ImageRenderer";
import CollapsibleFeaturedRenderer from "../components/block/collapsible/CollapsibleFeaturedRenderer";
import CollapsibleRenderer from "../components/block/collapsible/CollapsibleRenderer";
import FileRenderer from "../components/block/file/FileRenderer";
import InternalRenderer from "../components/block/internal/InternalRenderer";
import ExternalRenderer from "../components/block/external/ExternalRenderer";
import CarouselRenderer from "../components/block/carousel/CarouselRenderer";
import EventRendererCarousel from "../components/block/event/EventRendererCarousel";
import EventRendererList from "../components/block/event/EventRendererList";
import Seo from "../components/seo/Seo"

const Page = ({ data: { page } }) => {
    const { title, background, text, images, seoDescription, seoImage } = page;

    const ColoursContext = useColoursContext();
    const ColoursUpdateContext = useColoursUpdateContext();
    const AsciiUpdateContext = useAsciiUpdateContext();

    useEffect(() => {
        ColoursUpdateContext({ ...ColoursContext, text: text ? text.value : "var(--brown)" });
        AsciiUpdateContext(page.ascii === "true" ? true : false);
    }, []);

    const serialiser = useMemo(() => {
        const components = {
            block: (data) => <TextRenderer data={data} width={page.width} />,
            types: {
                blockHeading: (data) => <HeadingRenderer data={data} width={page.width} />,
                blockImg: ImageRenderer,
                blockCollapsible: (data) => {
                    return data.value.type === "featured" ? (
                        <CollapsibleFeaturedRenderer value={data.value} width={page.width} />
                    ) : (
                        <CollapsibleRenderer value={data.value} width={page.width} />
                    );
                },
                blockCarousel: CarouselRenderer,
                blockEvent: (data) => {
                    return data.value.type === "carousel" ? (
                        <EventRendererCarousel value={data.value} width={page.width} />
                    ) : (
                        <EventRendererList value={data.value} width={page.width} />
                    );
                },
            },
            marks: {
                blockFile: FileRenderer,
                blockInternal: InternalRenderer,
                blockExternal: ExternalRenderer,
                blockComment: () => null,
            },
        };

        return components;
    }, []);

    return (
        <>
            <Seo
                title={title}
                description={seoDescription}
                image={seoImage?.asset?.url}
            />
            <div className={style.page}>
                <PortableText value={page._rawContent} components={serialiser} />
                <div className={style.decoration}>
                    {images.map((image, index) => (
                        <div className={style.grid} key={image.asset._id}>
                            <Image
                                {...image}
                                className={style.decorationImage}
                                alt=""
                                width={1000}
                                style={{ gridColumn: index % 2 === 0 ? "10 / 12" : "1 / 4" }}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className={style.background}
                    style={{ background: background ? background : "#ffffff" }}
                ></div>
            </div>
        </>
    );
};

export default Page;

export const query = graphql`
    query getSinglePage($slug: String) {
        page: sanityPage(slug: { current: { eq: $slug } }) {
            title
            _rawContent(resolveReferences: { maxDepth: 10 })
            text {
                value
            }
            background
            width
            images {
                ...ImageWithPreview
            }
            ascii
            seoDescription
            seoImage {
                asset {
                    url
                }
            }
        }
    }
`;

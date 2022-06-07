import React, { useEffect, useMemo } from "react";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./page.module.css";
import {
    useActiveUpdateContext,
    useColoursContext,
    useColoursUpdateContext,
    useAsciiUpdateContext,
} from "../state/GlobalState";

import TextRenderer from "../components/block/text/TextRenderer";
import BoldRenderer from "../components/block/text/BoldRenderer";
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
import RadioRenderer from "../components/block/radio/RadioRenderer";
import ChatRenderer from "../components/block/chat/ChatRenderer";
import ImageGridRenderer from "../components/block/imagegrid/ImageGridRenderer";
import ShowRenderer from "../components/block/show/ShowRenderer";
import DecorationRenderer from "../components/block/decoration/DecorationRenderer";

import Seo from "../components/seo/Seo";

const Page = ({ data: { page } }) => {
    const {
        title,
        _rawContent,
        slug,
        backgroundLeft,
        backgroundRight,
        text,
        seoDescription,
        seoImage,
    } = page;

    const ActiveUpdateContext = useActiveUpdateContext();
    const ColoursContext = useColoursContext();
    const ColoursUpdateContext = useColoursUpdateContext();
    const AsciiUpdateContext = useAsciiUpdateContext();

    useEffect(() => {
        ActiveUpdateContext(slug.current);
        ColoursUpdateContext({ ...ColoursContext, text: text ? text.value : "var(--brown)" });
        AsciiUpdateContext(page.ascii === "true" ? true : false);
    }, []);

    const serialiser = useMemo(() => {
        const components = {
            block: (data) => (
                <TextRenderer
                    data={data}
                    width={page.width}
                    background={backgroundLeft ? backgroundLeft : "#ffffff"}
                />
            ),
            types: {
                blockHeading: (data) => <HeadingRenderer data={data} width={page.width} />,
                blockImg: ImageRenderer,
                blockCollapsible: (data) => {
                    return data.value.type === "featured" ? (
                        <CollapsibleFeaturedRenderer
                            value={data.value}
                            width={page.width}
                            background={backgroundLeft ? backgroundLeft : "#ffffff"}
                        />
                    ) : (
                        <CollapsibleRenderer
                            value={data.value}
                            width={page.width}
                            background={backgroundLeft ? backgroundLeft : "#ffffff"}
                        />
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
                blockRadio: RadioRenderer,
                blockChat: ChatRenderer,
                blockImgGrid: ImageGridRenderer,
                blockShow: (data) => <ShowRenderer value={data.value} width={page.width} />,
                blockBackground: (data) => <DecorationRenderer value={data.value} />,
            },
            marks: {
                strong: BoldRenderer,
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
            <Seo title={title} description={seoDescription} image={seoImage?.asset?.url} />
            <div className={style.page}>
                <PortableText value={_rawContent} components={serialiser} />
                <div
                    className={style.background}
                    style={{
                        background:
                            backgroundLeft && backgroundRight
                                ? `linear-gradient(to right, ${backgroundLeft}, ${backgroundRight})`
                                : "#ffffff",
                    }}
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
            slug {
                current
            }
            _rawContent(resolveReferences: { maxDepth: 10 })
            text {
                value
            }
            backgroundLeft
            backgroundRight
            width
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

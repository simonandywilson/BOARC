import React, {useEffect} from "react";
import { graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./page.module.css";

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

const Page = ({ data: { page } }) => {
    return (
        <div className={style.page}>
            <PortableText value={page._rawContent} components={components} />
        </div>
    );
};

export default Page;

const collapsibleType = (data) => {
    return data.value.type === "featured" ? (
        <CollapsibleFeaturedRenderer value={data.value} />
    ) : (
        <CollapsibleRenderer value={data.value} />
    );
};

const eventType = (data) => {
    return data.value.type === "carousel" ? (
        <EventRendererCarousel value={data.value} />
    ) : (
        <EventRendererList value={data.value} />
    );
};

const components = {
    block: TextRenderer,
    types: {
        blockHeading: HeadingRenderer,
        blockImg: ImageRenderer,
        blockCollapsible: collapsibleType,
        blockCarousel: CarouselRenderer,
        blockEvent: eventType,
    },
    marks: {
        blockFile: FileRenderer,
        blockInternal: InternalRenderer,
        blockExternal: ExternalRenderer,
        blockComment: () => null,
    },
};

export const query = graphql`
    query getSinglePage($slug: String) {
        page: sanityPage(slug: { current: { eq: $slug } }) {
            _rawContent(resolveReferences: { maxDepth: 10 })
        }
    }
`;

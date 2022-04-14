import React, { useEffect } from "react";
import { graphql, Link } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./event.module.css";
import Image from "gatsby-plugin-sanity-image";
import { useAsciiUpdateContext } from "../state/GlobalState";
import Seo from "../components/seo/Seo"

const Event = ({ pageContext, data: { sanityEvent } }) => {
    const {
        parent,
        title,
        banner,
        start,
        _rawProgramme,
        _rawDescription,
        background,
        seoDescription,
        seoImage,
    } = sanityEvent;
    const options = { day: "numeric", year: "numeric", month: "short" };
    const date = new Date(start).toLocaleDateString("en-GB", options);
    const AsciiUpdateContext = useAsciiUpdateContext();

    useEffect(() => {
        AsciiUpdateContext(false);
    }, []);

    return (
        <>
            <Seo
                title={`${parent.title}: ${title}`}
                description={seoDescription}
                image={seoImage?.asset?.url}
            />
            <div className={style.nav}>
                <Link to={`/${sanityEvent.parent.slug.current}`} className={style.back}>
                    &lsaquo;{`Back to ${sanityEvent.parent.title}`}
                </Link>
                <div className={style.subNav}>
                    <div className={style.border}>{"-".repeat(100)}</div>
                    {pageContext.previous && (
                        <Link to={`/${pageContext.previous.slug.current}`} className={style.prev}>
                            &lsaquo;Previous event
                        </Link>
                    )}
                    {pageContext.next && (
                        <Link to={`/${pageContext.next.slug.current}`} className={style.next}>
                            Next event&rsaquo;
                        </Link>
                    )}
                </div>
            </div>
            <div className={style.grid}>
                <Image {...banner} className={style.banner} alt={""} width={1000} />
                <div className={style.programme}>
                    <div className={style.date}>{date}</div>
                    <PortableText value={_rawProgramme} />
                </div>
                <div className={style.description}>
                    <div className={style.title}>{title}</div>
                    <PortableText value={_rawDescription} />
                </div>
            </div>
            <div
                className={style.background}
                style={{ background: background ? background : "#ffffff" }}
            ></div>
        </>
    );
};

export default Event;

export const query = graphql`
    query getSingleEvent($slug: String) {
        sanityEvent(slug: { current: { eq: $slug } }) {
            banner {
                ...ImageWithPreview
            }
            start
            title
            _rawProgramme
            _rawDescription
            text {
                value
            }
            background
            parent: eventParent {
                title
                slug {
                    current
                }
            }
            seoDescription
            seoImage {
                asset {
                    url
                }
            }
        }
    }
`;

import React from "react";
import { graphql, Link } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./event.module.css";
import Image from "gatsby-plugin-sanity-image";

const Event = ({ pageContext, data: { sanityEvent } }) => {
    const { title, banner, start, _rawProgramme, _rawDescription, background } = sanityEvent;
    const options = { day: "numeric", year: "numeric", month: "short" };
    const date = new Date(start).toLocaleDateString("en-GB", options);
    return (
        <div>
            <div className={style.nav}>
                <Link to={`/events`} className={style.back}>
                    &lsaquo;Back to Event List
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
            <div className={style.background} style={{background: background ? background : "#ffffff"}}></div>
        </div>
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
        }
    }
`;

import React, { useEffect } from "react";
import { graphql, Link } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./event.module.css";
import Image from "gatsby-plugin-sanity-image";
import { useActiveUpdateContext, useAsciiUpdateContext } from "../state/GlobalState";
import Seo from "../components/seo/Seo";

const optionsDate = { day: "numeric", year: "numeric", month: "long" };
const dateFormat = new Intl.DateTimeFormat("en-GB", optionsDate);

const Event = ({ pageContext, data: { sanityEvent } }) => {
    const {
        parent,
        type,
        title,
        icon,
        banner,
        url,
        start,
        end,
        _rawProgramme,
        _rawDescription,
        text,
        background,
        seoDescription,
        seoImage,
    } = sanityEvent;

    const ActiveUpdateContext = useActiveUpdateContext();
    const AsciiUpdateContext = useAsciiUpdateContext();

    useEffect(() => {
        ActiveUpdateContext(parent.slug.current);
        AsciiUpdateContext(false);
    }, []);

    const textColour = text?.value === "#ffffff" ? "#ffffff" : "var(--brown)";

    const dateStart = new Date(start);
    const dateEnd = new Date(end);
    // const timeStart = new Date(start).toLocaleTimeString([], { timeStyle: "short" });
    // const timeEnd = new Date(start).toLocaleTimeString([], { timeStyle: "short" });
    // const sameDay = dateStart.toDateString() === dateEnd.toDateString();
    const formattedDate = dateFormat.formatRange(dateStart, dateEnd);
    const bannerImage = banner ? banner : icon;

    return (
        <>
            <Seo
                title={`${parent.title}: ${title}`}
                description={seoDescription}
                image={seoImage?.asset?.url}
            />
            <div className={style.nav} style={{ color: textColour }}>
                <Link
                    to={`/${sanityEvent.parent.slug.current}`}
                    className={style.back}
                    style={{ color: textColour }}
                >
                    &lsaquo;{`Back to ${sanityEvent.parent.title}`}
                </Link>
                <div className={style.subNav}>
                    <div className={style.border}>{"-".repeat(100)}</div>
                    {pageContext.previous && (
                        <Link
                            to={`/${pageContext.previous.slug.current}`}
                            className={style.prev}
                            style={{ color: textColour }}
                        >
                            &lsaquo;Previous event
                        </Link>
                    )}
                    {pageContext.next && (
                        <Link
                            to={`/${pageContext.next.slug.current}`}
                            className={style.next}
                            style={{ color: textColour }}
                        >
                            Next event&rsaquo;
                        </Link>
                    )}
                </div>
            </div>
            <div className={style.grid} style={{ color: textColour }}>
                {bannerImage && (
                    <div className={style.banner}>
                        <Image {...bannerImage} alt={""} width={1000} loading="eager" />
                    </div>
                )}

                <div className={style.programme}>
                    <div className={style.date}>{formattedDate}</div>
                    <PortableText value={_rawProgramme} />
                </div>
                <div className={style.description}>
                    <div className={style.title}>{title}</div>
                    {type === "external" && (
                        <>
                            <br />
                            <a
                                className={style.link}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: textColour }}
                            >
                                visit external event site
                            </a>
                        </>
                    )}
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
            type
            banner {
                ...ImageWithPreview
            }
            start
            end
            title
            icon {
                ...ImageWithPreview
            }
            url
            _rawProgramme
            _rawDescription
            text: text {
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

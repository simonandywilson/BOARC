import React, { useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useStaticQuery, graphql, Link } from "gatsby";
import * as style from "./nav.module.css";
import Primary from "./Primary";
import Secondary from "./Secondary";

const Nav = ({ setAsciiWidth, setNavPortrait }) => {
    const {
        homepage,
        menu: { nodes },
    } = useStaticQuery(getData);
    const menus = nodes;
    const { height, ref } = useResizeDetector();

    useEffect(
        () => document.documentElement.style.setProperty("--nav-height", `-${height}px`),
        [height]
    );

    return (
        <section className={style.nav} ref={ref}>
            <Title
                setAsciiWidth={setAsciiWidth}
                setNavPortrait={setNavPortrait}
                title={homepage.title}
            />
            <nav className={style.containerLandscape}>
                <Primary menus={menus} homepage={homepage.initial.slug.current} />
                <Secondary menus={menus} />
            </nav>
        </section>
    );
};

const Title = ({ setAsciiWidth, setNavPortrait, title }) => {
    const { width, ref } = useResizeDetector();
    useEffect(() => {
        if (width !== undefined) {
            setAsciiWidth(width);
        }
    }, [width]);

    return (
        <>
            <h1 className={style.title} ref={ref}>
                <Link to="/">{title}</Link>
            </h1>
            <button className={style.togglePortrait} onClick={() => setNavPortrait(true)}>
                <svg width="48" height="36" viewBox="0 0 48 36">
                    <line
                        y1="1"
                        x2="48"
                        y2="1"
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                    <line
                        y1="35"
                        x2="48"
                        y2="35"
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                    <line
                        y1="18"
                        x2="48"
                        y2="18"
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </button>
        </>
    );
};

export default Nav;

const getData = graphql`
    {
        homepage: sanityHomepage {
            title
            initial {
                ... on SanityLanding {
                    id
                    slug {
                        current
                    }
                }
                ... on SanityPage {
                    id
                    slug {
                        current
                    }
                }
            }
        }
        menu: allSanityMenu(sort: { fields: [orderRank], order: ASC }) {
            nodes {
                _id
                title
                pages {
                    ... on SanityPage {
                        _id
                        _rawContent
                        title
                        slug {
                            current
                        }
                    }
                }
                landing {
                    slug {
                        current
                    }
                }
            }
        }
    }
`;

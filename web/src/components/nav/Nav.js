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
            <Title setAsciiWidth={setAsciiWidth} title={homepage.title} />
            <nav className={style.containerLandscape}>
                <Primary menus={menus} homepage={homepage.initial.slug.current} />
                <Secondary menus={menus} />
            </nav>
            <nav className={style.containerPortrait}>
                <button className={style.togglePortrait} onClick={() => setNavPortrait(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                        <path d="M6 36V33H42V36ZM6 25.5V22.5H42V25.5ZM6 15V12H42V15Z" />
                    </svg>
                </button>
            </nav>
        </section>
    );
};

const Title = ({ setAsciiWidth, title }) => {
    const { width, ref } = useResizeDetector();
    useEffect(() => {
        if (width !== undefined) {
            setAsciiWidth(width);
        }
    }, [width]);

    return (
        <div className={style.title} ref={ref}>
            <Link to="/">{title}</Link>
        </div>
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
                        homepage
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

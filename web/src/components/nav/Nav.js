import React, { useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useStaticQuery, graphql } from "gatsby";
import * as style from "./nav.module.css";
import Primary from "./Primary";
import Secondary from "./Secondary";

const Nav = ({ setAsciiWidth }) => {
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
            <nav className={style.container}>
                <Primary menus={menus} />
                <Secondary menus={menus} />
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
            <span>{title}</span>
        </div>
    );
};

export default Nav;

const getData = graphql`
    {
        homepage: sanityHomepage {
            title
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

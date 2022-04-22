import React, { useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useStaticQuery, graphql } from "gatsby";
import * as style from "./nav.module.css";
import Primary from "./Primary";
import SecondaryLink from "./SecondaryLink";
import SecondaryTab from "./SecondaryTab";
import { useActiveContext } from "../../state/GlobalState";

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

    const ActiveContext = useActiveContext();

    return (
        <section className={style.nav} ref={ref}>
            <Title setAsciiWidth={setAsciiWidth} title={homepage.title} />
            <nav className={style.container}>
                <div className={style.wrapper}>
                    {menus.map((menu, index) => {
                        const items = menu.pages;
                        const landing = menu.landing;
                        const isMulti = items.length > 1 ? true : false;
                        const slug = isMulti ? landing.slug.current : items[0].slug.current;
                        const multiSlugs = isMulti && items.map((slug) => `${slug.slug.current}`);
                        const isActive =
                            slug === ActiveContext ||
                            (isMulti && multiSlugs.includes(ActiveContext));

                        return (
                            <Primary
                                key={menu._id + menu.title}
                                title={menu.title}
                                slug={slug}
                                isActive={isActive}
                                isLast={index + 1 !== menus.length ? false : true}
                            />
                        );
                    })}
                </div>
                <div className={style.wrapper}>
                    {menus.map((menu) => {
                        const items = menu.pages;
                        const landing = menu.landing;
                        const isMulti = items.length > 1 ? true : false;
                        const slug = isMulti ? landing.slug.current : items[0].slug.current;
                        const multiSlugs = isMulti && items.map((slug) => `${slug.slug.current}`);
                        const isActive =
                            slug === ActiveContext ||
                            (isMulti && multiSlugs.includes(ActiveContext));

                        return isMulti ? (
                            <SecondaryLink
                                key={menu._id}
                                items={items}
                                isActive={isActive}
                                active={ActiveContext}
                            />
                        ) : (
                            <SecondaryTab
                                key={menu._id}
                                items={items}
                                isActive={isActive}
                                active={ActiveContext}
                            />
                        );
                    })}
                </div>
            </nav>
        </section>
    );
};

const Title = ({ setAsciiWidth, title }) => {
    const { width, ref } = useResizeDetector();
    useEffect(() => setAsciiWidth(width), [width]);

    return (
        <div className={style.title} ref={ref}>
            {title}
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

import React, { useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useStaticQuery, graphql } from "gatsby";
import * as style from "./nav.module.css";
import Primary from "./Primary";
import Secondary from "./Secondary";

const Nav = ({ setAsciiWidth }) => {
    const { homepage, menu: nodes } = useStaticQuery(getData);
    const menus = nodes.nodes;
    const currentSlug = typeof window !== "undefined" ? window.location.pathname : null;
    const [active, setActive] = useState(currentSlug);
    const { width, ref } = useResizeDetector();

    useEffect(() => setAsciiWidth(width), [width]);

    useEffect(() => {
        setActive(currentSlug);
    }, [currentSlug]);

    return (
        <section className={style.nav}>
            <div className={style.title} ref={ref}>
                {homepage.title}
            </div>
            <nav className={style.wrapper}>
                {menus.map((menu, index) => {
                    const items = menu.pages;
                    const landing = menu.landing;
                    const isMulti = items.length > 1 ? true : false;
                    const singular = items[0]._rawContent?.filter(
                        (type) => type._type === "blockHeading"
                    );
                    const multiSlugs = isMulti && items.map((slug) => `/${slug.slug.current}`);
                    const isActiveMulti =
                        (isMulti && `/${landing.slug.current}` === active) ||
                        (isMulti && multiSlugs.includes(active));
                    const isActiveSingular = !isMulti && `/${items[0].slug.current}` === active;
                    return (
                        <div key={menu._id}>
                            <Primary
                                title={menu.title}
                                items={menu.pages}
                                landing={menu.landing}
                                isMulti={isMulti}
                                isActiveMulti={isActiveMulti}
                                isActiveSingular={isActiveSingular}
                                isLast={index + 1 !== menus.length ? false : true}
                            />

                            <Secondary
                                items={menu.pages}
                                isMulti={isMulti}
                                isActiveMulti={isActiveMulti}
                                isActiveSingular={isActiveSingular}
                                singular={singular}
                                active={active}
                            />
                        </div>
                    );
                })}
            </nav>
            {/* <div className={style.secondary}>
                <div>The Project</div>
                <div>Values and Accountability</div>
                <div>Opportunities</div>
            </div> */}
        </section>
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

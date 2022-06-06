import React from "react";
import * as style from "./navportrait.module.css";
import { nanoid } from "nanoid";
import { useStaticQuery, graphql, Link, navigate } from "gatsby";
import { useActiveContext, useSubheadingContext } from "../../state/GlobalState";
import scrollTo from "gatsby-plugin-smoothscroll";
import slugify from "slugify";

const getAbbreviation = (text) => {
    if (typeof text != "string" || !text) {
        return "";
    }
    const acronym = text
        .match(/[\p{Alpha}\p{Nd}]+/gu)
        .reduce(
            (previous, next) =>
                previous + (+next === 0 || parseInt(next) ? parseInt(next) : next[0] || ""),
            ""
        )
        .toUpperCase();
    return acronym;
};

const NavPortrait = ({ navPortrait, setNavPortrait }) => {
    const ActiveContext = useActiveContext();
    const SubheadingContext = useSubheadingContext();

    const {
        homepage,
        menu: { nodes },
    } = useStaticQuery(getData);
    const menus = nodes;

    return (
        navPortrait && (
            <div className={style.navPortrait}>
                <div className={style.heading}>
                    <button className={style.close} onClick={() => setNavPortrait(false)}>
                        X
                    </button>
                </div>
                {menus.map((menu) => {
                    const items = menu.pages;
                    const landing = menu.landing;
                    const isMulti = items.length > 1 ? true : false;
                    const isHomepage = isMulti
                        ? false
                        : items[0].slug.current === homepage.initial.slug.current
                        ? true
                        : false;
                    const slug = isMulti ? landing.slug.current : items[0].slug.current;

                    return (
                        <div className={style.nav}>
                            <div>{menu.title}</div>
                            {isMulti ? (
                                <div className={style.links}>
                                    {items.map((link) => {
                                        return (
                                            <Link
                                                key={nanoid()}
                                                to={`/${link.slug.current}`}
                                                style={{
                                                    textDecoration:
                                                        `${link.slug.current}` === ActiveContext
                                                            ? "underline"
                                                            : "none",
                                                }}
                                            >
                                                {link.title.length > 30
                                                    ? getAbbreviation(link.title)
                                                    : link.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className={style.tabs}>
                                    {items[0]._rawContent
                                        ?.filter((type) => type._type === "blockHeading")
                                        .map((tab, index) => {
                                            const tabSlug = slugify(tab.heading, {
                                                lower: true,
                                            });
                                            return (
                                                <button
                                                    key={nanoid()}
                                                    style={{
                                                        textDecoration:
                                                            tabSlug === SubheadingContext
                                                                ? "underline"
                                                                : "none",
                                                    }}
                                                    onClick={() => {
                                                        if (slug !== ActiveContext) {
                                                            navigate(
                                                                isHomepage
                                                                    ? `/#${
                                                                          index !== 0 ? tabSlug : ""
                                                                      }`
                                                                    : `/${slug}#${
                                                                          index !== 0 ? tabSlug : ""
                                                                      }`
                                                            );
                                                        } else {
                                                            scrollTo(`#${tabSlug}`);
                                                        }
                                                    }}
                                                >
                                                    {tab.heading.length > 30
                                                        ? getAbbreviation(tab.heading)
                                                        : tab.heading}
                                                </button>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        )
    );
};

export default NavPortrait;

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

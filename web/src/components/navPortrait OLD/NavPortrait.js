import React from "react";
import * as style from "./navportrait.module.css";
import { nanoid } from "nanoid";
import { useStaticQuery, graphql, Link } from "gatsby";
import { useActiveContext } from "../../state/GlobalState";
import NavPortraitSecondaryLink from "./NavPortraitSecondaryLink";
import NavPortraitSecondaryTab from "./NavPortraitSecondaryTab";

const NavPortrait = ({ navPortrait, setNavPortrait }) => {
    const columns = 30;
    const ActiveContext = useActiveContext();

    const {
        homepage,
        menu: { nodes },
    } = useStaticQuery(getData);
    const menus = nodes;

    return (
        navPortrait && (
            <div className={style.navPortrait}>
                <div className={style.heading}>
                    MENU
                    <button className={style.close} onClick={() => setNavPortrait(false)}>
                        X
                    </button>
                </div>
                <div className={style.wrapper}>
                    <div
                        className={style.grid}
                        style={{
                            gridTemplateColumns: "repeat(1, 1fr)",
                        }}
                    >
                        {menus.map((menu, index) => {
                            const items = menu.pages;
                            const landing = menu.landing;
                            const isMulti = items.length > 1 ? true : false;
                            const isHomepage = isMulti
                                ? false
                                : items[0].slug.current === homepage.initial.slug.current
                                ? true
                                : false;
                            const slug = isMulti ? landing.slug.current : items[0].slug.current;
                            const multiSlugs =
                                isMulti && items.map((slug) => `${slug.slug.current}`);
                            const isActive =
                                slug === ActiveContext ||
                                (isMulti && multiSlugs.includes(ActiveContext));
                            const title = [...menu.title];
                            const dotsStart = Math.max(0, Math.floor((columns - title.length) / 2));
                            const dotsEnd = Math.max(0, Math.ceil((columns - title.length) / 2));
                            return (
                                <React.Fragment key={nanoid()}>
                                    <div
                                        className={style.row}
                                        style={{
                                            gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                        }}
                                    >
                                        {[...Array(dotsStart)].map(() => (
                                            <span key={nanoid()}>.</span>
                                        ))}
                                        <div
                                            style={{
                                                gridColumn: `${dotsStart + 1} / span ${
                                                    title.length
                                                }`,
                                            }}
                                            className={style.text}
                                        >
                                            <Link to={isHomepage ? `/` : `/${slug}`}>
                                                <div
                                                    style={{
                                                        color: isActive ? "var(--red)" : "#ffffff",
                                                        textDecoration: isActive
                                                            ? "underline"
                                                            : "none",
                                                        gridTemplateColumns: `repeat(${title.length}, 1fr)`,
                                                    }}
                                                    className={style.textGrid}
                                                >
                                                    {title.map((text) => (
                                                        <span key={nanoid()}>{text}</span>
                                                    ))}
                                                </div>
                                            </Link>
                                        </div>
                                        {[...Array(dotsEnd)].map(() => (
                                            <span key={nanoid()}>.</span>
                                        ))}
                                    </div>
                                    {isMulti ? (
                                        <NavPortraitSecondaryLink
                                            items={items}
                                            active={ActiveContext}
                                            columns={columns}
                                        />
                                    ) : (
                                        <NavPortraitSecondaryTab
                                            items={items}
                                            active={ActiveContext}
                                            columns={columns}
                                            isActive={isActive}
                                        />
                                    )}
                                    <div
                                        className={style.row}
                                        style={{
                                            gridTemplateColumns: `repeat(${columns}, 1fr)`,
                                        }}
                                    >
                                        {[...Array(columns)].map(() => (
                                            <span key={nanoid()}>.</span>
                                        ))}
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
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

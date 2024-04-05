import React from "react";
import { Link } from "gatsby";
import * as style from "./primary.module.css";
import { useActiveContext } from "../../state/GlobalState";
import { nanoid } from "nanoid";

const Primary = ({ menus, homepage }) => {
    const ActiveContext = useActiveContext();
    return (
        <div className={style.wrapper}>
            {menus.map((menu, index) => {
                const items = menu.pages;
                const landing = menu.landing;
                const isMulti = items.length > 1 ? true : false;
                const isHomepage = isMulti ? false : items[0].slug.current === homepage ? true : false;
                const slug = isMulti ? landing.slug.current : items[0].slug.current;
                const multiSlugs = isMulti && items.map((slug) => `${slug.slug.current}`);
                const isActive =
                    slug === ActiveContext || (isMulti && multiSlugs.includes(ActiveContext));
                const isLast = index + 1 !== menus.length ? false : true;
                return (
                    <div className={style.primary} key={nanoid()}>
                        <Link to={isHomepage ? `/` : `/${slug}`}>
                            <span
                                style={{
                                    color: isActive ? "var(--purple)" : "var(--brown)",
                                    textDecoration: isActive ? "underline" : "none",
                                }}
                            >
                                {menu.title}
                            </span>
                        </Link>
                        {!isLast && <span className={style.divider}>&nbsp;|&nbsp;</span>}
                    </div>
                );
            })}
        </div>
    );
};

export default Primary;

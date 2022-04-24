import React from "react";
import SecondaryLink from "./SecondaryLink";
import SecondaryTab from "./SecondaryTab";
import { useActiveContext } from "../../state/GlobalState";
import { nanoid } from "nanoid";

const Secondary = ({ menus }) => {
    const ActiveContext = useActiveContext();
    return menus.map((menu) => {
        const items = menu.pages;
        const landing = menu.landing;
        const isMulti = items.length > 1 ? true : false;
        const slug = isMulti ? landing.slug.current : items[0].slug.current;
        const multiSlugs = isMulti && items.map((slug) => `${slug.slug.current}`);
        const isActive = slug === ActiveContext || (isMulti && multiSlugs.includes(ActiveContext));

        return isMulti ? (
            <SecondaryLink
                key={menu._id}
                items={items}
                isActive={isActive}
                active={ActiveContext}
            />
        ) : (
            <SecondaryTab key={nanoid()} items={items} isActive={isActive} active={ActiveContext} />
        );
    });
};

export default Secondary;

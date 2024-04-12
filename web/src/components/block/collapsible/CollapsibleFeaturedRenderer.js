import React, { useState, useMemo } from "react";
import * as style from "./collapsibleFeatured.module.css";
import { PortableText } from "@portabletext/react";
import TextRendererCollapsible from "./TextRendererCollapsible";
// import useCollapse from "react-collapsed";

const CollapsibleFeaturedRenderer = ({ value, width, background }) => {
    // const [isExpanded, setExpanded] = useState(false);
    // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    // const serialiser = useMemo(() => {
    //     const components = {
    //         block: (data) => <TextRendererCollapsible data={data} background={background} />,
    //     };
    //     return components;
    // }, []);
    return (
        <div className={style.grid}>
            {/* <div
                className={style.collapsible}
                style={{
                    gridColumn:
                        width === "wide"
                            ? "var(--grid-position-main-wide)"
                            : "var(--grid-position-main-normal)",
                }}
            >
                <div className={style.featured}>
                    <div className={style.icon}>
                        {value.icon?.character ? value.icon.character : "A"}
                    </div>
                    <div>
                        <div>{value.title}</div>
                        <button
                            {...getToggleProps({
                                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                            })}
                            className={style.button}
                        >
                            <span className={style.read}>
                                {isExpanded ? "–" : "+"} read {isExpanded ? "less" : "more"}
                            </span>
                        </button>
                    </div>
                </div>
                <div className={style.text} {...getCollapseProps()}>
                    <PortableText value={value.text} components={serialiser} />
                </div>
            </div> */}
        </div>
    );
};

export default CollapsibleFeaturedRenderer;

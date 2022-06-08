import React, { useState, useMemo } from "react";
import * as style from "./collapsible.module.css";
import { PortableText } from "@portabletext/react";
import TextRendererCollapsible from "./TextRendererCollapsible";
import useCollapse from "react-collapsed";


const CollapsibleRenderer = ({ value, width, background }) => {
    const [isExpanded, setExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    const serialiser = useMemo(() => {
        const components = {
            block: (data) => <TextRendererCollapsible data={data} background={background} />,
        };
        return components;
    }, []);

    return (
        <div className={style.grid}>
            <div
                className={style.collapsible}
                style={{
                    gridColumn:
                        width === "wide"
                            ? "var(--grid-position-main-wide)"
                            : "var(--grid-position-main-normal)",
                }}
            >
                <div className={style.wrapper}>
                    <span className={style.icon}>{isExpanded ? "–" : "+"}&nbsp;</span>
                    <div className={style.content}>
                        <button
                            {...getToggleProps({
                                onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                            })}
                            className={style.button}
                        >
                            {value.title}
                        </button>
                        <div className={style.text} {...getCollapseProps()}>
                            <PortableText value={value.text} components={serialiser} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollapsibleRenderer;

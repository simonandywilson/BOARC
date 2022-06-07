import React from "react";
import * as style from "./textcollapsible.module.css";
import { PortableText } from "@portabletext/react";

const TextRendererCollapsible = ({ data, background }) => {
    const { children, value } = data;

    const hasComment = children[0]?.props?.markType === "blockComment" ? true : false;

    console.log(hasComment);

    // const format = (text) => {
    //     switch (value.style) {
    //         case "h5":
    //             return (
    //                 <p
    //                     className={style.centered}
    //                     style={{
    //                         gridColumn:
    //                             width === "wide"
    //                                 ? "var(--grid-position-main-wide)"
    //                                 : "var(--grid-position-main-normal)",
    //                     }}
    //                 >
    //                     {text}
    //                 </p>
    //             );

    //         default:
    //             return (
    //                 <p
    //                     className={style.normal}
    //                     style={{
    //                         gridColumn:
    //                             width === "wide"
    //                                 ? "var(--grid-position-main-wide)"
    //                                 : "var(--grid-position-main-normal)",
    //                     }}
    //                 >
    //                     {text}
    //                 </p>
    //             );
    //     }
    // };

    return (
        // <div className={style.grid}>
        //     {hasComment && children[0]?.props?.value?.comment ? (
        //         <>
        //             <div
        //                 className={style.comment}
        //                 style={{
        //                     "--background": background,
        //                 }}
        //             >
        //                 <PortableText
        //                     value={children[0].props.value.comment}
        //                     components={components}
        //                 />
        //             </div>
        //             {format(children[0].props.text)}
        //         </>
        //     ) : (
        //         format(children)
        //     )}
        // </div>
        <div>
            {hasComment && children[0]?.props?.value?.comment && (
                <div className={style.grid}>
                    <div
                        className={style.comment}
                        style={{
                            "--background": background,
                        }}
                    >
                        <PortableText
                            value={children[0].props.value.comment}
                            components={components}
                        />
                    </div>
                </div>
            )}
            <p>{children}</p>
        </div>
    );
};

const components = {
    block: {
        normal: ({ children }) => <p>{children}</p>,
    },
};

export default TextRendererCollapsible;

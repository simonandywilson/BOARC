import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import * as style from "./show.module.css";

import ShowRendererRow from "./ShowRendererRow";

const ShowRenderer = ({ value, width }) => {
    const { number } = value;
    const {
        allSanityShow: { shows },
    } = useStaticQuery(getData);

    return (
        <div className={style.grid}>
            {shows.map((show) => {
                return <ShowRendererRow width={width} show={show} key={show._id} />;
            })}
        </div>
        // <div className={style.grid}>
        //     <div
        //         className={style.row}
        //         style={{
        //             gridColumn:
        //                 width === "wide"
        //                     ? "var(--grid-position-main-wide)"
        //                     : "var(--grid-position-main-normal)",
        //         }}
        //     >
        //         <div className={style.icon}></div>
        //         <div>
        //             <div className={style.details}>
        //                 <div
        //                     className={style.date}
        //                     style={{
        //                         marginRight:
        //                             width === "wide"
        //                                 ? "calc(var(--column-single) + var(--margin))"
        //                                 : 0,
        //                     }}
        //                 >
        //                     {show.date}
        //                 </div>
        //                 <div className={style.title}>{show.title}</div>
        //             </div>

        //             <div className={style.content}>
        //                 <AnimatePresence>
        //                     {open && (
        //                         <motion.div
        //                             className={style.description}
        //                             initial="collapsed"
        //                             animate="open"
        //                             exit="collapsed"
        //                             variants={{
        //                                 open: { opacity: 1, height: "auto" },
        //                                 collapsed: { opacity: 0, height: 0 },
        //                             }}
        //                             transition={{ duration: 0.25 }}
        //                         >
        //                             {show.previewText}
        //                         </motion.div>
        //                     )}
        //                 </AnimatePresence>
        //             </div>
        //             <div className={style.links}>
        //                 <button
        //                     className={style.dropdown}
        //                     onClick={() => setOpen((prevOpen) => !prevOpen)}
        //                 >
        //                     learn more
        //                 </button>
        //             </div>
        //             <span className={style.border}>{"-".repeat(100)}</span>
        //         </div>
        //     </div>
        // </div>
    );
};

export default ShowRenderer;

const getData = graphql`
    {
        allSanityShow {
            shows: nodes {
                _id
                title
                date(formatString: "DD/MM/YYYY")
                audio {
                    asset {
                        url
                    }
                }
                icon {
                    ...ImageWithPreview
                }
                _rawInfo
            }
        }
    }
`;

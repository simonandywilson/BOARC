import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./faq.module.css";

import scrollTo from "gatsby-plugin-smoothscroll";
import slugify from "slugify";

const Faq = ({ faqOpen, setFaqOpen }) => {
    const { allSanityFaq: faq } = useStaticQuery(getData);

    return (
        <div className={style.faq}>
            <div className={style.panel} style={{ visibility: faqOpen ? "visible" : "hidden" }}>
                <button onClick={() => setFaqOpen(false)} className={style.close}>
                    Close X
                </button>
                <div className={style.content}>
                    <div className={style.heading}>
                        <div className={style.title}>Frequently Asked Questions</div>
                        {faq.faq.map((title, index) => (
                            <button
                                key={title._id}
                                className={style.tab}
                                onClick={() =>
                                    scrollTo(
                                        `#${slugify(`${title.title}-faq`, {
                                            lower: true,
                                        })}`
                                    )
                                }
                            >
                                {title.title}
                                {index + 1 !== faq.faq.length && <span>,&nbsp;</span>}
                            </button>
                        ))}
                    </div>
                    {faq.faq.map((text) => {
                        return (
                            <div key={text._id}>
                                <span
                                    id={slugify(`${text.title}-faq`, {
                                        lower: true,
                                    })}
                                    className={style.anchor}
                                ></span>
                                <PortableText value={text._rawText} components={components} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Faq;

const components = {
    block: {
        h5: ({ children }) => <h5 className={style.question}>{children}</h5>,
        normal: ({ children }) => <p className={style.body}>{children}</p>,
    },
};

const getData = graphql`
    {
        allSanityFaq {
            faq: nodes {
                _id
                title
                _rawText
            }
        }
    }
`;

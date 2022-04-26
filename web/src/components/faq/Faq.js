import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./faq.module.css";
import { useEasyReadContext, useEasyReadUpdateContext } from "../../state/GlobalState";
import scrollTo from "gatsby-plugin-smoothscroll";
const slugify = require("slugify");

const Faq = () => {
    const [faqOpen, setFaqOpen] = useState(false);
    const [easyReadOpen, setEasyReadOpen] = useState(false);
    const { allSanityFaq: faq } = useStaticQuery(getData);

    const EasyReadContext = useEasyReadContext();
    const EasyReadUpdateContext = useEasyReadUpdateContext();

    useEffect(() => {
        if (EasyReadContext.text) {
            document.documentElement.style.setProperty("--font", "var(--font-easy)");
        }

        if (!EasyReadContext.text) {
            document.documentElement.style.setProperty("--font", "var(--font-regular)");
        }
    }, [EasyReadContext.text]);

    useEffect(() => {
        if (EasyReadContext.image) {
            document.documentElement.style.setProperty("--image-visibility", "hidden");
        }

        if (!EasyReadContext.image) {
            document.documentElement.style.setProperty("--image-visibility", "visible");
        }
    }, [EasyReadContext.image]);

    return (
        <div className={style.faq}>
            <div className={style.box}>
                <div
                    className={style.toggleEasyRead}
                    style={{ visibility: easyReadOpen ? "visible" : "hidden" }}
                >
                    <button
                        className={style.toggleText}
                        style={{ color: EasyReadContext.text ? "var(--brown)" : "var(--purple)" }}
                        onClick={() =>
                            EasyReadUpdateContext((prevState) => ({
                                ...prevState,
                                text: !prevState.text,
                            }))
                        }
                    >
                        Aa
                    </button>
                    <button
                        className={style.toggleImage}
                        style={{
                            borderColor: EasyReadContext.image ? "var(--brown)" : "var(--purple)",
                        }}
                        onClick={() =>
                            EasyReadUpdateContext((prevState) => ({
                                ...prevState,
                                image: !prevState.image,
                            }))
                        }
                    >
                        <span></span>
                    </button>
                </div>
                <div className={style.toggleMain}>
                    <button onClick={() => setEasyReadOpen((prevState) => !prevState)}>
                        <p>Easy Read</p>
                    </button>
                    <button onClick={() => setFaqOpen((prevState) => !prevState)}>
                        <p>FAQ</p>
                    </button>
                </div>
            </div>
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
                                        `#${slugify(title.title, {
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
                                    id={slugify(text.title, {
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

import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./faq.module.css";
import { useEasyReadContext, useEasyReadUpdateContext } from "../../state/GlobalState";
import scrollTo from "gatsby-plugin-smoothscroll";
const slugify = require("slugify");

const Faq = ({ clearSketch }) => {
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
                    style={{ display: easyReadOpen ? "block" : "none" }}
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
                        title="Easy Read Font"
                    >
                        Aa
                    </button>
                    <button
                        className={style.toggleImage}
                        onClick={() =>
                            EasyReadUpdateContext((prevState) => ({
                                ...prevState,
                                image: !prevState.image,
                            }))
                        }
                        title="Toggle Images"
                    >
                        <svg
                            id="a"
                            xmlns="http://www.w3.org/2000/svg"
                            width="72"
                            height="48"
                            viewBox="0 0 72 48"
                        >
                            <rect
                                x="1"
                                y="1"
                                width="70"
                                height="46"
                                fill="none"
                                stroke-miterlimit="10"
                                stroke-width="2"
                                vectorEffect="non-scaling-stroke"
                                stroke={EasyReadContext.image ? "var(--brown)" : "var(--purple)"}
                            />
                            <polyline
                                points="1 36.77 21.73 13.21 41.94 36.19 54.67 21.73 71 40.29"
                                fill="none"
                                stroke-miterlimit="10"
                                stroke-width="1.5"
                                vectorEffect="non-scaling-stroke"
                                stroke={EasyReadContext.image ? "var(--brown)" : "var(--purple)"}
                            />
                            <circle
                                cx="41.32"
                                cy="15.77"
                                r="7.95"
                                fill="none"
                                stroke-miterlimit="10"
                                stroke-width="1.5"
                                vectorEffect="non-scaling-stroke"
                                stroke={EasyReadContext.image ? "var(--brown)" : "var(--purple)"}
                            />
                        </svg>
                    </button>
                    <button
                        className={style.clearSketch}
                        onClick={() => clearSketch()}
                        title="Clear Sketch"
                    >
                        <svg width="36" height="36" viewBox="0 0 36 36">
                            <rect x="0" width="6" height="6" />
                            <rect x="6" y="6" width="6" height="6" />
                            <polygon points="36 18 36 30 30 30 30 24 12 24 12 12 24 12 24 18 36 18" />
                            <rect x="24" y="6" width="6" height="6" />
                            <polygon points="12 24 12 36 0 36 0 30 6 30 6 24 12 24" />
                        </svg>
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

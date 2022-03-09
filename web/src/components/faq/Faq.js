import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { PortableText } from "@portabletext/react";
import * as style from "./faq.module.css";
import {
    useEasyReadContext, useEasyReadUpdateContext
} from "../../state/GlobalState";

const Faq = () => {
    const [open, setOpen] = useState(false);
    const { allSanityFaq: faq } = useStaticQuery(getData);

    const EasyReadContext = useEasyReadContext();
    const EasyReadUpdateContext = useEasyReadUpdateContext();

    useEffect(() => {
        if (EasyReadContext) {
            document.documentElement.style.setProperty("--font", "var(--font-easy)");
        } else {
            document.documentElement.style.setProperty("--font", "var(--font-regular)");
        }
    }, [EasyReadContext]);
    
    return (
        <div className={style.faq}>
            <div className={style.box}>
                <div>
                    <button onClick={() => EasyReadUpdateContext((prevState) => !prevState)}>
                        Easy Read
                    </button>
                    <button onClick={() => setOpen((prevState) => !prevState)}>FAQ</button>
                </div>
            </div>
            <div className={style.panel} style={{ visibility: open ? "visible" : "hidden" }}>
                <button onClick={() => setOpen(false)}>Close X</button>
                <div className={style.content}>
                    <div className={style.title}>Frequently Asked Questions</div>
                    {faq.faq.map((title, index) => (
                        <a key={title._id} className={style.tab}>
                            {title.title}
                            {index + 1 !== faq.faq.length && <span>, </span>}
                        </a>
                    ))}
                    {faq.faq.map((text) => (
                        <div key={text._id}>
                            <PortableText value={text._rawText} components={components} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;

const components = {
    block: {
        h5: ({ children }) => <h5 className={style.heading}>{children}</h5>,
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

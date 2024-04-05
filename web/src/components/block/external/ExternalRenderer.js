import React from "react";
import * as style from "./external.module.css";

const ExternalRenderer = ({ text, value }) => {
    const type = () => {
        switch (value.type) {
            case "telephone":
                return <a href={`tel:${value.link}`} className={style.external}>{text}</a>;

            case "email":
                return (
                    <a href={`mailto:${value.link}`} className={style.external}>
                        {text}
                    </a>
                );

            default:
                return (
                    <a rel="noopener noreferrer" href={value.link} className={style.external}>
                        {text}
                    </a>
                );
        }
    };
  
    return type();
};

export default ExternalRenderer;

import React from "react";
import * as style from "./file.module.css";

const FileRenderer = ({ value, children }) => {
    const url = value.reference.file.asset.url;
    return (
        <a href={`${url}?dl=${value.reference.title}`} className={style.file}>
            {children}
        </a>
    );
};

export default FileRenderer;

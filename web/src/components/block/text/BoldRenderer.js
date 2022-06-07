import React from "react";
import * as style from "./text.module.css";
import { PortableText } from "@portabletext/react";

const BoldRenderer = ({ text }) => {
    return <h3 className={style.subheading}>{text}</h3>;
};

export default BoldRenderer;

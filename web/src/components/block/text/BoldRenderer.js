import React from "react";
import * as style from "./text.module.css";
import { PortableText } from "@portabletext/react";

const BoldRenderer = ({ text }) => {
    return <strong className={style.subheading}>{text}</strong>;
};

export default BoldRenderer;

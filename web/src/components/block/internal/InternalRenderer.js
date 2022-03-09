import React from "react";
import { Link } from "gatsby";
import * as style from "./internal.module.css"

const InternalRenderer = ({text, value}) => {
    return <Link to={`/${value.reference.slug.current}`} className={style.internal}>{text}</Link>;
};

export default InternalRenderer;

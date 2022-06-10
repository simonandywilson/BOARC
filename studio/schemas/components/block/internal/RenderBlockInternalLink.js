import React from "react";
import PropTypes from "prop-types";
import { InternalIcon } from "../../../styles/Icons";
import * as style from "./blockinternal.module.css";

const RenderBlockInternalLink = ({ children }) => (
    <span>
        <span className={style.background}>{children}</span>
        {InternalIcon("small")}
    </span>
);

RenderBlockInternalLink.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockInternalLink;

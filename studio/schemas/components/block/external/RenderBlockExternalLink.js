import React from "react";
import PropTypes from "prop-types";
import * as style from "./blockexternal.module.css"

import { ExternalIcon, PhoneIcon, EmailIcon } from "../../../styles/Icons";

const RenderBlockExternalLink = ({ children, type }) => {
    const icon = () => {
        if (type === "external") {
            return ExternalIcon();
        }
        if (type === "telephone") {
            return PhoneIcon();
        }
        if (type === "email") {
            return EmailIcon();
        }
    }

    return (
        <span className={style.link}>
            {children} {icon()} {}
        </span>
    );
};

RenderBlockExternalLink.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockExternalLink;

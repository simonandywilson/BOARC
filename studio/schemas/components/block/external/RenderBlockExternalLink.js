import React from "react";
import PropTypes from "prop-types";
import * as style from "./blockexternal.module.css"

import { ExternalIcon, PhoneIcon, EmailIcon } from "../../../styles/Icons";

const RenderBlockExternalLink = ({ children, type }) => {
    const icon = () => {
        if (type === "web") {
            return ExternalIcon("small");
        }
        if (type === "telephone") {
            return PhoneIcon("small");
        }
        if (type === "email") {
            return EmailIcon("small");
        }
        return ExternalIcon("small");
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

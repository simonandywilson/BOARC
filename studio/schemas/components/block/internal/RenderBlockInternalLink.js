import React from "react";
import PropTypes from "prop-types";
import { InternalIcon } from "../../../styles/Icons";
import * as style from "./blockinternal.module.css";

const RenderBlockInternalLink = (props) => (
    <div
        style={{
            maxWidth: "100%",
        }}
        className={style.container}
    >
        <div
            style={{
                background: "rgba(104,108,227,0.3)",
                borderRadius: "5px",
                padding: "5px",
                color: "var(--card-fg-color)",
                background: "rgba(104,108,227,0.3)",
                display: "inline-block",
            }}
        >
            <span className={style.border}>
                {props.children} {InternalIcon()} {}
            </span>
        </div>
    </div>
);

RenderBlockInternalLink.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockInternalLink;

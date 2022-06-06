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
        <div className={style.wrapper}>
            <div className={style.background}></div>
            <span className={style.border}>
                {props.children} {InternalIcon("small")} {}
            </span>
        </div>
    </div>
);

RenderBlockInternalLink.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockInternalLink;

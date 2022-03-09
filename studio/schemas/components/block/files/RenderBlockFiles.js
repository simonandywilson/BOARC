import React from "react";
import PropTypes from "prop-types";
import { FileIcon } from "../../../styles/Icons";
import * as style from "./blockfiles.module.css";

const RenderBlockFiles = (props) => (
    <span className={style.link}>
        {props.children} {FileIcon()} {}
    </span>
);

RenderBlockFiles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockFiles;

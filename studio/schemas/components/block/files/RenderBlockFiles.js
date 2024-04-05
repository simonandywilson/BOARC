import React from "react";
import PropTypes from "prop-types";
import { FileIcon } from "../../../styles/Icons";
import * as style from "./blockfiles.module.css";

const RenderBlockFiles = ({ children }) => (
    <span>
        <span className={style.background}>{children}</span>{" "}{FileIcon("small")}
    </span>
);

RenderBlockFiles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockFiles;

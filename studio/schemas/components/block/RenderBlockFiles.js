import React from "react";
import PropTypes from "prop-types";
import { FileIcon } from "../../styles/Icons";

const RenderBlockFiles = (props) => (
    <span>
        {props.children} {FileIcon()} {}
    </span>
);

RenderBlockFiles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockFiles;

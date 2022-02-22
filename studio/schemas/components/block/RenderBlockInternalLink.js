import React from "react";
import PropTypes from "prop-types";

import { InternalIcon } from "../../styles/Icons";

const RenderBlockInternalLink = (props) => (
    <span>
        {props.children} {InternalIcon()} {}
    </span>
);

RenderBlockInternalLink.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockInternalLink;

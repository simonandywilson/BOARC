import React from "react";
import PropTypes from "prop-types";

import { ExternalIcon } from "../../styles/Icons";

const RenderBlockExternalLink = (props) => (
    <span>
        {props.children} {ExternalIcon()} {}
    </span>
);

RenderBlockExternalLink.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockExternalLink;

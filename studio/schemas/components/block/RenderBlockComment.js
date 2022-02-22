import React from "react";
import PropTypes from "prop-types";

import { CommentIcon } from "../../styles/Icons";

const RenderBlockComment = (props) => (
    <span>
        {props.children} {CommentIcon()} {}
    </span>
);

RenderBlockComment.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockComment;

import React from "react";
import PropTypes from "prop-types";

import { CommentIcon } from "../../../styles/Icons";

const RenderBlockComment = (props) => (
    <div
        style={{
            marginLeft: "20px",
            background: "#e6e6e6",
            borderRadius: "10px",
            padding: "5px",
            color: "var(--card-fg-color)",
        }}
    >
        <span>
            {props.children} {CommentIcon("small")} {}
        </span>
    </div>
);

RenderBlockComment.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RenderBlockComment;

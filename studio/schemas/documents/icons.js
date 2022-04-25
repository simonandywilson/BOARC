import React from "react";
import { IconsIconLarge } from "../styles/Icons";
import RenderIcon from "../components/icon/RenderIcon";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: "icons",
    title: "Icons",
    icon: IconsIconLarge,
    type: "document",
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "icons" }),
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "character",
            title: "Character",
            type: "string",
            validation: (Rule) => Rule.required().max(1).error("A single character is required."),
        },
        {
            name: "renderIcon",
            title: "Icon Preview",
            type: "string",
            inputComponent: RenderIcon,
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "character",
        },
        prepare(selection) {
            const { title, subtitle } = selection;
            return {
                title: title ?? "Icon",
                subtitle: subtitle,
                media: (
                    <span
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="100%" height="100%">
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dy=".25em"
                                fill="#786a2f"
                                fontSize="32"
                                fontFamily="BOARCSymbols"
                            >
                                {subtitle}
                            </text>
                        </svg>
                    </span>
                ),
            };
        },
    },
};

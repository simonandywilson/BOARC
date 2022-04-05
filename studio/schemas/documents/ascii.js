import React from "react";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import RenderAscii from "../components/ascii/RenderAscii";

const ASCIIIcon = (title) => (
    <span
        style={{
            width: "1.5rem",
            height: "1.5rem",
            position: "relative",
            background: "#000000",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <svg width="100%" height="100%">
            <defs>
                <style>
                    @import
                    url("https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap");
                </style>
            </defs>

            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".35em"
                fill="#ffffff"
                fontSize="16"
                fontFamily="Nunito"
            >
                {title ? (title.length > 1 ? "♣︎" : title) : "♣︎"}
            </text>
        </svg>
    </span>
);

export default {
    name: "ascii",
    title: "ASCII",
    icon: ASCIIIcon("A"),
    type: "document",
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: "ascii" }),
        {
            name: "characterName",
            title: "Character Name",
            type: "string",
        },
        {
            name: "characterLayout",
            title: "Character Layout",
            type: "table",
            validation: (Rule) =>
                Rule.required()
                    .custom((table) => {
                        if (typeof table === "undefined") {
                            return true;
                        }

                        // if (table.rows.length !== 7 && table.rows[0].cells.length !== 6) {
                        //     return "Table must have 7 rows & 6 columns.";
                        // }

                        if (table.rows.length !== 7) {
                            return "Table must have 7 rows.";
                        }

                        // if (table.rows[0].cells.length !== 6) {
                        //     return "Table must have 6 columns.";
                        // }

                        let duplicates = false;

                        function addAttributeInput(obj) {
                            for (var o in obj) {
                                if (typeof obj[o] == "object") {
                                    addAttributeInput(obj[o]);
                                } else {
                                    if (!!obj && obj.constructor === Array) {
                                        if (obj[o].length > 1) {
                                            duplicates = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        addAttributeInput(table.rows);

                        if (duplicates) {
                            return "Cells must contain single characters.";
                        }

                        return true;
                    })
                    .error(),
        },
        {
            name: "characterPreview",
            title: "Character Preview",
            type: "string",
            inputComponent: RenderAscii,
        },
    ],
    preview: {
        select: {
            title: "characterName",
        },
        prepare(selection) {
            const { title } = selection;
            const symbol = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            const letter = /^[A-Za-z]+$/;
            const number = /\d/;

            const checkType = () => {
                if (title.length > 1) {
                    return "Other";
                }

                if (symbol.test(title)) {
                    return "Symbol";
                }

                if (letter.test(title)) {
                    return "Letter";
                }

                if (number.test(title)) {
                    return "Number";
                }

                return "Other"
            };
            return {
                title: title ? title : "Character",
                media: ASCIIIcon(title),
                subtitle: checkType()
            };
        },
    },
};

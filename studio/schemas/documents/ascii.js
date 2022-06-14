import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import RenderAscii from "../components/ascii/RenderAscii";
import { AsciiIcon } from "../styles/Icons";

export default {
    name: "ascii",
    title: "ASCII",
    icon: () => AsciiIcon("A"),
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
            initialValue: {
                rows: [
                    {
                        _type: "tableRow",
                        cells: ["", "", "", "", "", ""],
                    },
                    {
                        _type: "tableRow",
                        cells: ["", "", "", "", "", ""],
                    },
                    {
                        _type: "tableRow",
                        cells: ["", "", "", "", "", ""],
                    },
                    {
                        _type: "tableRow",
                        cells: ["", "", "", "", "", ""],
                    },
                    {
                        _type: "tableRow",
                        cells: ["", "", "", "", "", ""],
                    },
                    {
                        _type: "tableRow",
                        cells: ["", "", "", "", "", ""],
                    },
                ],
            },
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

                return "Other";
            };
            return {
                title: title ? title : "Character",
                media: () => AsciiIcon(title),
                subtitle: checkType(),
            };
        },
    },
};

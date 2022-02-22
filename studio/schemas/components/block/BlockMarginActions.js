// marginActions.js
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@sanity/ui";
import { CommentIcon } from "../../styles/Icons";

function BlockMarginActions(props) {
    const handleClick = (event) => {
        const { insert, set, block, value } = props;

        // const test = value.map((blo) => {
        //     let obj = { ...blo };

        //     // const recordFoundByCode = record.find((rec) => rec.code === obj.code);

        //     // if (recordFoundByCode) {
        //     //     recordFoundByCode.records.forEach((item) => {
        //     //         obj.intime.push(item.intime);
        //     //         obj.quantity.push(item[obj.name]);
        //     //     });
        //     // }

        //     obj.children[0].text = "Heading one edited"

        //     return obj;
        // });

        // console.log(block, test[0]);
        // insert([
        //     {
        //         _type: "block",
        //         children: [
        //             {
        //                 _type: "span",
        //                 text: "Pong!",
        //                 marks: ["hgjdfjkgjfdhstdjyfkuygilfd456789"],
        //             },
        //         ],
        //         markDefs: [
        //             {
        //                 _type: "fileLink",
        //                 _key: "hgjdfjkgjfdhstdjyfkuygilfd456789",
        //             },
        //         ],
        //     },
        // ]);
        // set(
        //     {
        //         _type: "block",
        //         // _key: "sdfghljskfa",
        //         children: [
        //             {
        //                 _type: "span",
        //                 text: "Pong!",
        //                 // marks: ["hgjdfjkgjfdhstdjyfkuygilfd456789"],
        //             },
        //         ],
        //         // markDefs: [
        //         //     {
        //         //         _type: "fileLink",
        //         //         _key: "hgjdfjkgjfdhstdjyfkuygilfd456789",
        //         //     },
        //         // ],
        //     },
        // );
    };
    // const handleClick = () => {
    //     const { insert, block, value } = props;

    //     insert({
    //         _type: "block",
    //         style: "normal",
    //         children: [
    //             {
    //                 _type: "span",
    //                 text: "Let us JSON that: ",
    //             },
    //             {
    //                 _type: "span",
    //                 text: JSON.stringify(block),
    //             },
    //         ],
    //     });
    // };
    return (
        <Button
            icon={CommentIcon}
            padding={2}
            onClick={handleClick}
            title="Add a comment to this block."
            mode="bleed"
        />
    );
}

BlockMarginActions.propTypes = {
    block: PropTypes.shape({
        _key: PropTypes.string,
        _type: PropTypes.string,
    }).isRequired,
    value: PropTypes.arrayOf(
        PropTypes.shape({
            _key: PropTypes.string,
            _type: PropTypes.string,
        })
    ),
    path: PropTypes.string,
    insert: PropTypes.func,
    set: PropTypes.func,
    unset: PropTypes.func,
};

export default BlockMarginActions;

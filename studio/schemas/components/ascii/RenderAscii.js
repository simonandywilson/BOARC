import React from "react";
import { Card, Flex } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./RenderAscii.css"

export const RenderAscii = React.forwardRef((props, ref) => {
    const { type, markers, presence, compareValue } = props;
    return (
        <div>
            {props.document.characterLayout ? <FormField
                description={type.description}
                title={type.title}
                __unstable_markers={markers}
                __unstable_presence={presence}
                compareValue={compareValue}
            >
                <Card padding={[4, 4, 4, 4]} shadow={1} ref={ref}>
                    <Flex align={"center"} justify={"center"}>
                        <table className={style.table}>
                            <tbody>
                                {props.document.characterLayout.rows.map((row) => (
                                    <tr key={row._key}>
                                        {row.cells.map((cell, i) => (
                                            <td key={i}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Flex>
                </Card>
            </FormField> : <div></div>}
            
        </div>
    );
});

export default withDocument(RenderAscii);
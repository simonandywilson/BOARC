import React, { useState, useEffect } from "react";
import { Card, Flex } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./RenderAscii.css";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

export const RenderAsciiBanner = React.forwardRef((props, ref) => {
    const { type, markers, presence, compareValue } = props;
    const [data, setData] = useState([]);
    const targets = props.document.ascii.map((target) => {
        if (target._ref) {
            return `*[_id == '${target._ref}'][0]`;
        }
    });

    useEffect(() => {
        let toFetch = true;

        const fetchData = async () => {
            const data = await client.fetch(`[${targets.join(" ,")}]`);

            if (toFetch) {
                setData(data);
            }
        };

        fetchData().catch(console.error);

        return () => (toFetch = false);
    }, [props.document.ascii]);

    return (
        <div>
            <FormField
                description={type.description}
                title={type.title}
                __unstable_markers={markers}
                __unstable_presence={presence}
                compareValue={compareValue}
            >
                <Card padding={[4, 4, 4, 4]} shadow={1} overflow={"hidden"} ref={ref}>
                    <div className={style.marquee}>
                        <Flex align={"center"} justify={"center"} direction={"row"}>
                            {data.map((ascii, index) => {
                                return (
                                    <table key={ascii._id + index} className={style.table}>
                                        <tbody>
                                            {ascii.characterLayout.rows.map((row) => (
                                                <tr key={row._key}>
                                                    {row.cells.map((cell, i) => (
                                                        <td key={i}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                );
                            })}
                        </Flex>
                    </div>
                </Card>
            </FormField>
        </div>
    );
});

export default withDocument(RenderAsciiBanner);

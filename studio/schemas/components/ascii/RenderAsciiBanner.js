import React, { useState, useEffect } from "react";
import { Card, Flex } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import * as style from "./renderascii.module.css";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });
import Ticker from "./ticker/Ticker";
import PageVisibility from "react-page-visibility";

export const RenderAsciiBanner = React.forwardRef((props, ref) => {
    const { type } = props;
    const [data, setData] = useState([]);
    const [pageIsVisible, setPageIsVisible] = useState(true);

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
                setData(data.filter((i) => i));
            }
        };
        fetchData().catch(console.error);
        return () => (toFetch = false);
    }, [props.document.ascii]);

    useEffect(() => {
        const resizeEvent = new Event("resize");
        window.dispatchEvent(resizeEvent);
    }, []);

    const handleVisibilityChange = (isVisible) => setPageIsVisible(isVisible);

    return (
        <FormField description={type.description} title={type.title}>
            <Card padding={[4, 4, 4, 4]} shadow={1} overflow={"hidden"} ref={ref}>
                {data && data.length > 0 && (
                    <div>
                        <PageVisibility onChange={handleVisibilityChange}>
                            {pageIsVisible && (
                                <Ticker speed={5}>
                                    {() => (
                                        <Flex align={"center"} justify={"center"} direction={"row"}>
                                            {data.map((ascii, index) => {
                                                return (
                                                    <table
                                                        key={ascii._id + index}
                                                        className={style.table}
                                                    >
                                                        <tbody>
                                                            {ascii.characterLayout.rows.map(
                                                                (row) => (
                                                                    <tr key={row._key}>
                                                                        {row.cells.map(
                                                                            (cell, i) => (
                                                                                <td key={i}>
                                                                                    {cell}
                                                                                </td>
                                                                            )
                                                                        )}
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                );
                                            })}
                                        </Flex>
                                    )}
                                </Ticker>
                            )}
                        </PageVisibility>
                    </div>
                )}
            </Card>
        </FormField>
    );
});

export default withDocument(RenderAsciiBanner);

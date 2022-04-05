import React, { useState, useEffect } from "react";
import * as style from "./blockheading.module.css";
import { Container, Box, Text, Tooltip } from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const RenderBlockHeading = ({ value }) => {
    const { heading, border, colour } = value;

    const target = border ? border._ref : undefined;

    const [data, setData] = useState({});
    const borderTop = Object.keys(data).length != 0 ? data.borderTop.repeat(60) : "";
    const borderBottom = Object.keys(data).length != 0 ? data.borderBottom.repeat(60) : "";

    useEffect(() => {
        let toFetch = true;

        if (target !== undefined) {
            const fetchData = async () => {
                const data = await client.fetch(`*[_id == $targetId][0]`, {
                    targetId: target,
                });

                if (toFetch) {
                    setData(data);
                }
            };

            fetchData().catch(console.error);
        } else {
            setData({});
        }

        return () => (toFetch = false);
    }, [border]);

    return (
        <Container className={style.container}>
            <Tooltip
                content={
                    <Box padding={2}>
                        <Text muted size={1}>
                            Heading
                        </Text>
                    </Box>
                }
                fallbackPlacements={["right", "left"]}
                placement="top"
                portal
            >
                <div>
                    <div
                        className={style.border}
                        style={{ color: colour?.value ? colour.value : "#000000" }}
                    >
                        {borderTop}
                    </div>
                    <span
                        className={style.heading}
                        style={{ color: colour?.value ? colour.value : "#000000" }}
                    >
                        {heading}
                    </span>
                    <div
                        className={style.border}
                        style={{ color: colour?.value ? colour.value : "#000000" }}
                    >
                        {borderBottom}
                    </div>
                </div>
            </Tooltip>
        </Container>
    );
};

export default RenderBlockHeading;

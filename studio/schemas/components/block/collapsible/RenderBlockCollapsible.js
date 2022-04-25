import React, { useState, useEffect } from "react";
import { withDocument } from "part:@sanity/form-builder";
import { CollapsibleIcon } from "../../../styles/Icons";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });
import Preview from "part:@sanity/base/preview";
import { Container, Box, Text, Tooltip } from "@sanity/ui";

const RenderBlockCollapsible = ({ value }) => {
    const { title, text, icon, type } = value;
    const [data, setData] = useState(null);

    useEffect(() => {
        let toFetch = true;

        if (icon !== undefined) {
            const fetchData = async () => {
                const data = await client.fetch(
                    `*[_id == $targetId][0]{character}`,
                    {
                        targetId: icon._ref,
                    }
                );

                if (toFetch) {
                    setData(data);
                }
            };

            fetchData().catch(console.error);
        } else {
            setData({});
        }

        return () => (toFetch = false);
    }, []);

    return (
        <Container>
            <Tooltip
                content={
                    <Box padding={2}>
                        <Text muted size={1}>
                            {type === "Featured" ? "Featured Collapsible" : "Collapsible"}
                        </Text>
                    </Box>
                }
                fallbackPlacements={["right", "left"]}
                placement="top"
                portal
            >
                <Container>
                    <Preview
                        type="image"
                        value={{
                            title: title,
                            subtitle: text !== undefined ? text : "",
                            media:
                                icon !== undefined && data !== null ? (
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
                                                {data.character}
                                            </text>
                                        </svg>
                                    </span>
                                ) : (
                                    CollapsibleIcon
                                ),
                        }}
                    />
                </Container>
            </Tooltip>
        </Container>
    );
};

export default withDocument(RenderBlockCollapsible);

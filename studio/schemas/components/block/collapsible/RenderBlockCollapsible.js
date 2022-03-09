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
                    `*[_id == $targetId][0]{"imageUrl": icon.asset->url}`,
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
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "100%",
                                            width: "100%",
                                            padding: "4px",
                                        }}
                                    >
                                        <img
                                            src={data.imageUrl}
                                            alt=""
                                            style={{
                                                position: "relative",
                                                maxHeight: "100%",
                                                maxWidth: "100%",
                                            }}
                                        />
                                    </div>
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

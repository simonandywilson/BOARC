import React, { useEffect, useState } from "react";
import * as style from "./blockbackground.module.css";
import { Tooltip, Box, Text, Flex, Container, Card, Spinner } from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const RenderBlockBackground = ({ value }) => {
    const { position, reference } = value;
    const [data, setData] = useState(null);

    useEffect(() => {
        let toFetch = true;
        if (reference && toFetch && data === null) {
            const fetchData = async () => {
                const data = await client.fetch(`*[_id == $targetId][0]{image{asset-> {url}}}`, {
                    targetId: reference._ref,
                });
                
                setData(data);
            };
            fetchData().catch(console.error);
        } 
        return () => (toFetch = false);
    }, [reference]);

    return (
        <Container className={style.container}>
            <Tooltip
                content={
                    <Box padding={2}>
                        <Text muted size={1}>
                            Background Image
                        </Text>
                    </Box>
                }
                fallbackPlacements={["left", "bottom"]}
                placement="right"
                portal
            >
                <Flex justify={position} className={style.flex}>
                    {data ? (
                        <img src={data.image.asset.url} alt="" className={style.image}></img>
                    ) : (
                        <Card padding={[4, 4, 4, 4]} shadow={1} radius={2} tone="primary">
                            <Spinner message="Loading image preview…" />
                        </Card>
                    )}
                </Flex>
            </Tooltip>
        </Container>
    );
};

export default RenderBlockBackground;

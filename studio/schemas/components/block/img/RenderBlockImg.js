import React from "react";
import * as style from "./blockimg.module.css";
import { Tooltip, Box, Text, Flex, Container, Card, Spinner } from "@sanity/ui";
import { getImage } from "@sanity/asset-utils";

import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const RenderBlockImg = ({ value }) => {
    const { media, caption, alt } = value;

    const image = media !== undefined ? getImage(media._ref, client.config()) : undefined;

    return (
        <Container className={style.container}>
            <Tooltip
                content={
                    <Box padding={2}>
                        <Text muted size={1}>
                            Image
                        </Text>
                    </Box>
                }
                fallbackPlacements={["right", "left"]}
                placement="top"
                portal
                disabled={caption || alt ? false : true}
            >
                <Flex justify={"right"} className={style.flex}>
                    {image ? (
                        <img src={image.asset.url} alt="" className={style.image}></img>
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

export default RenderBlockImg;

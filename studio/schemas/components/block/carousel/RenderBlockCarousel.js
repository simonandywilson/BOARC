import React, { useState, useEffect } from "react";
import * as style from "./blockcarousel.module.css";
import { Container, Grid, Box, Text, Tooltip, Card, Spinner } from "@sanity/ui";
import { getImage } from "@sanity/asset-utils";
import { nanoid } from "nanoid";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const RenderBlockCarousel = ({ value }) => {
    const [data, setData] = useState([]);
    const { content } = value;
    useEffect(() => {
        if (content) {
            content.map((image) => {
                if ("asset" in image) {
                    const url = getImage(image.asset._ref, client.config());
                    setData((prevArray) => [...prevArray, url.asset.url]);
                }
            });
        }
    }, [content]);

    return (
        <Container className={style.container}>
            <Tooltip
                content={
                    <Box padding={2}>
                        <Text muted size={1}>
                            Carousel
                        </Text>
                    </Box>
                }
                fallbackPlacements={["left", "bottom"]}
                placement="right"
                portal
            >
                <Grid columns={[2, 3, 3, 3]} gap={[1, 1, 2, 2]} padding={2}>
                    {data ? (
                        data.map((image) => (
                            <img key={nanoid()} src={image} className={style.image} />
                        ))
                    ) : (
                        <Card padding={[4, 4, 4, 4]} shadow={1} radius={2} tone="primary">
                            <Spinner message="Loading carousel preview…" />
                        </Card>
                    )}
                </Grid>
            </Tooltip>
        </Container>
    );
};

export default RenderBlockCarousel;

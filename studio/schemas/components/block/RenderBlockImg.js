import React from "react";
import * as style from "./RenderBlockImg.css";
import { Tooltip, Box, Text, Flex, Container } from "@sanity/ui";
import { getImage } from "@sanity/asset-utils";

import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const RenderBlockImg = ({ value }) => {
    const { media, caption, alt } = value;

    const image = media !== undefined ? getImage(media._ref, client.config()) : undefined;

    const content = () => {
        if (caption) {
            return caption;
        } else {
            if (alt) {
                return alt;
            } else {
                return "";
            }
        }
    };

    return (
        <Container className={style.container}>
            <Flex justify={"right"} className={style.flex}>
                <Tooltip
                    content={
                        <Box padding={2}>
                            <Text muted size={1}>
                                {content()}
                            </Text>
                        </Box>
                    }
                    fallbackPlacements={["right", "left"]}
                    placement="bottom"
                    portal
                    disabled={caption || alt ? false : true}
                >
                    {image && <img src={image.asset.url} alt="" className={style.image}></img>}
                </Tooltip>
            </Flex>
        </Container>
    );
};

export default RenderBlockImg;

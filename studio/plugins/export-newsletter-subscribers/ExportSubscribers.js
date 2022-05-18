import React, { useState, useEffect, useCallback } from "react";
import {
    ToastProvider,
    useToast,
    Box,
    Container,
    Card,
    Flex,
    Heading,
    Stack,
    Text,
    Button,
    Spinner,
    Inline,
} from "@sanity/ui";
import { DownloadIcon, SyncIcon, CheckmarkIcon } from "@sanity/icons";

import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });
import { ExportToCsv } from "export-to-csv";

const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const ExportSubscribers = () => {
    const [status, setStatus] = useState("load");
    const [data, setData] = useState([]);

    const toast = useToast();

    const options = {
        filename: `boarc_subscribers_${new Date().toLocaleDateString("en-UK")}`,
        useKeysAsHeaders: true,
    };

    const icon = useCallback(() => {
        if (status === "load") {
            return SyncIcon;
        }
        if (status === "loading") {
            return (
                <Box marginTop={1}>
                    <Flex justify="center">
                        <Spinner muted />
                    </Flex>
                </Box>
            );
        }
        if (status === "loaded") {
            return CheckmarkIcon;
        }
    }, [status]);

    const handleLoad = () => {
        if (status === "load") {
            setStatus("loading");
        }
    };

    useEffect(() => {
        let toFetch = true;
        if (status === "loading" && toFetch) {
            const fetchData = async () => {
                const data = await client.fetch(`*[_type == "subscriber"]{email}`);
                setData(data);
                setStatus("loaded");
            };
            fetchData().catch((error) => {
                console.log(error);
                toast.push({
                    status: "error",
                    title: "There’s been an error fetching your subscribers. Please try again.",
                });
            });
        }
        return () => (toFetch = false);
    }, [status]);

    return (
        <ToastProvider>
            <Container width={0} height={"stretch"} display={"flex"}>
                <Flex align={"center"} justify={"center"}>
                    <Container width={3}>
                        <Card margin={3} padding={4} radius={2} shadow={2} tone="default">
                            <Stack space={5}>
                                <Heading as="h1" size={3}>
                                    Subscriber Export Dashboard
                                </Heading>
                                <Text as="p">
                                    Download your newsletter subscribers here for phpList.
                                </Text>
                                <Flex>
                                    <Inline space={[3, 3, 4]}>
                                        <Button
                                            fontSize={[2, 2, 2]}
                                            icon={icon()}
                                            mode="ghost"
                                            padding={[3, 3, 3]}
                                            text={capitalise(status)}
                                            onClick={handleLoad}
                                            disabled={status === "loaded" ? true : false}
                                        />
                                        <Button
                                            fontSize={[2, 2, 2]}
                                            icon={DownloadIcon}
                                            padding={[3, 3, 3]}
                                            text="Download"
                                            tone="primary"
                                            disabled={status === "loaded" ? false : true}
                                            onClick={() => {
                                                if (data.length > 0) {
                                                    const csvExporter = new ExportToCsv(options);
                                                    csvExporter.generateCsv(data);
                                                } else {
                                                    toast.push({
                                                        status: "warning",
                                                        title: "There is no data to download.",
                                                    });
                                                }
                                            }}
                                        />
                                    </Inline>
                                </Flex>
                            </Stack>
                        </Card>
                    </Container>
                </Flex>
            </Container>
        </ToastProvider>
    );
};

export default ExportSubscribers;

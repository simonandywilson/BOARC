import React, { useState, useEffect, useCallback } from "react";
import {
    ToastProvider,
    useToast,
    Dialog,
    Box,
    Card,
    Flex,
    Heading,
    Stack,
    Text,
    Button,
    Spinner,
    TextInput,
    Label,
} from "@sanity/ui";
import { DownloadIcon, SyncIcon, CheckmarkIcon, TrashIcon } from "@sanity/icons";

import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });
import { ExportToCsv } from "export-to-csv";

const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const Subscriber = () => {
    const [status, setStatus] = useState("load");
    const [deleteStatus, setDeleteStatus] = useState("default");
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const onClose = useCallback(() => setOpen(false), []);
    const onOpen = useCallback(() => setOpen(true), []);

    const toast = useToast();

    const options = {
        filename: `boarc_subscribers_${new Date().toLocaleDateString("en-UK")}`,
        useKeysAsHeaders: true,
    };

    const icon = useCallback(() => {
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

        return SyncIcon;
    }, [status]);

    const deleteIcon = useCallback(() => {
        if (deleteStatus === "deleting") {
            return (
                <Box marginTop={1}>
                    <Flex justify="center">
                        <Spinner muted />
                    </Flex>
                </Box>
            );
        }
        if (deleteStatus === "deleted") {
            return CheckmarkIcon;
        }

        return TrashIcon;
    }, [deleteStatus]);

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

    useEffect(() => {
        let toDelete = true;
        if (deleteStatus === "deleting" && toDelete) {
            client
                .delete({ query: '*[_type == "subscriber"][0...999]' })
                .then(() => {
                    setDeleteStatus("deleted");
                    toast.push({
                        status: "success",
                        title: "Subscribers successfully deleted.",
                    });
                    setValue("");
                })
                .catch((error) => {
                    console.log(error);
                    toast.push({
                        status: "error",
                        title: "There’s been an error deleting subscribers. Please try again.",
                    });
                });
        }
        return () => (toDelete = false);
    }, [deleteStatus]);

    useEffect(() => {
        if (deleteStatus === "deleted") {
            const timer = setTimeout(() => {
                onClose();
                setDeleteStatus("default");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [deleteStatus]);

    return (
        <ToastProvider>
            <Card margin={3} padding={4} radius={2} shadow={1}>
                <Stack space={4}>
                    <Card>
                        <Heading as="h1" size={3}>
                            Subscriber Export & Delete Tool
                        </Heading>
                    </Card>
                    <Card padding={4} radius={2} shadow={1} tone="default">
                        <Stack space={4}>
                            <Text as="p">
                                Download your newsletter subscribers here for phpList.
                            </Text>
                            <Card>
                                <div style={{ display: "flex", width: "100%" }}>
                                    <Button
                                        fontSize={2}
                                        icon={icon()}
                                        mode="ghost"
                                        padding={3}
                                        text={capitalise(status)}
                                        onClick={handleLoad}
                                        disabled={status === "loaded" ? true : false}
                                    />
                                    <Card style={{ flexGrow: 2 }} marginLeft={4}>
                                        <Button
                                            fontSize={2}
                                            icon={DownloadIcon}
                                            padding={3}
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
                                                        title: "There are no subscribers to download.",
                                                    });
                                                }
                                            }}
                                            style={{ width: "100%" }}
                                        />
                                    </Card>
                                </div>
                            </Card>
                        </Stack>
                    </Card>
                    <Card >
                        <Stack space={4}>
                            {/* <Text as="p">Delete old newsletter subscribers here.</Text> */}
                            <Button
                                fontSize={[2, 2, 2]}
                                icon={TrashIcon}
                                padding={[3, 3, 3]}
                                text="Delete Subscribers..."
                                tone={open ? "default" : "critical"}
                                disabled={open ? true : false}
                                onClick={onOpen}
                            />
                        </Stack>
                    </Card>
                </Stack>
            </Card>

            {open && (
                <Dialog
                    header="Delete Subscribers"
                    id="delete-dialog"
                    onClose={onClose}
                    zOffset={1000}
                >
                    <Box padding={4}>
                        <Stack space={5}>
                            <Card>
                                <Card marginBottom={3}>
                                    <Label size={2}>Type 'delete' below to confirm</Label>
                                </Card>
                                <TextInput
                                    fontSize={3}
                                    onChange={(event) => setValue(event.currentTarget.value)}
                                    placeholder=""
                                    value={value}
                                />
                            </Card>
                            <Button
                                fontSize={2}
                                icon={deleteIcon()}
                                padding={3}
                                text="Delete Subscribers"
                                tone="critical"
                                onClick={() => setDeleteStatus("deleting")}
                                disabled={value === "delete" ? false : true}
                            />
                        </Stack>
                    </Box>
                </Dialog>
            )}
        </ToastProvider>
    );
};

export default Subscriber;

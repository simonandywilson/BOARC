import React, { useState, useCallback, useEffect } from "react";
import {
    ToastProvider,
    useToast,
    Dialog,
    Box,
    Card,
    Flex,
    Heading,
    Stack,
    Badge,
    Button,
    Spinner,
    TextInput,
    Container,
    Label,
} from "@sanity/ui";
import { CheckmarkIcon, TrashIcon } from "@sanity/icons";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const Chat = () => {
    const [deleteStatus, setDeleteStatus] = useState("default");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [number, setNumber] = useState("");
    const [formattedNumber, setFormattedNumber] = useState("");

    const onClose = useCallback(() => setOpen(false), []);
    const onOpen = useCallback(() => setOpen(true), []);

    const toast = useToast();

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

    useEffect(() => {
        let toDelete = true;
        if (deleteStatus === "deleting" && toDelete) {
            client
                .delete({
                    query: '*[_type == "comments"]| order(_createdAt asc)[0...$number]',
                    params: { number: formattedNumber },
                })
                .then(() => {
                    setDeleteStatus("deleted");
                    toast.push({
                        status: "success",
                        title: "Chats successfully deleted.",
                    });
                    setValue("")
                    setNumber("")
                })
                .catch((error) => {
                    console.log(error);
                    toast.push({
                        status: "error",
                        title: "There’s been an error deleting chats. Please try again.",
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

    useEffect(() => {
        let stripped = number.replace(/\D/g, "");
        if (stripped === "") {
            setFormattedNumber("");
        } else {
            setFormattedNumber(parseInt(stripped));
        }
    }, [number]);

    return (
        <ToastProvider>
            <Container>
                <Card margin={3} padding={4} radius={2} shadow={1}>
                    <Stack space={4}>
                        <Card>
                            <Heading as="h1" size={3}>
                                Chat Delete Tool
                            </Heading>
                        </Card>
                        <Card tone="default">
                            <Stack space={4}>
                                {/* <Text as="p">Delete old chat messages here.</Text> */}
                                <Button
                                    fontSize={[2, 2, 2]}
                                    icon={TrashIcon}
                                    padding={[3, 3, 3]}
                                    text="Delete Oldest Chats..."
                                    onClick={onOpen}
                                    tone={open ? "default" : "critical"}
                                    disabled={open ? true : false}
                                />
                            </Stack>
                        </Card>
                    </Stack>
                </Card>
            </Container>

            {open && (
                <Dialog
                    header="Delete Oldest Chats"
                    id="delete-dialog"
                    onClose={onClose}
                    zOffset={1000}
                >
                    <Box padding={4}>
                        <Stack space={5}>
                            <Card>
                                <Card marginBottom={3}>
                                    <Label size={2}>Number of old chats to delete</Label>
                                </Card>
                                <TextInput
                                    fontSize={3}
                                    placeholder=""
                                    value={formattedNumber}
                                    onChange={(event) => setNumber(event.currentTarget.value)}
                                />
                                {formattedNumber > 999 && (
                                    <Badge tone="critical">Maximum 999</Badge>
                                )}
                            </Card>
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
                                text="Delete Oldest Chats"
                                tone="critical"
                                onClick={() => setDeleteStatus("deleting")}
                                disabled={
                                    value.toUpperCase() === "DELETE" &&
                                    formattedNumber > 0 &&
                                    formattedNumber <= 999
                                        ? false
                                        : true
                                }
                            />
                        </Stack>
                    </Box>
                </Dialog>
            )}
        </ToastProvider>
    );
};

export default Chat;

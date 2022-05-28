import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Box, Flex, Text } from "@sanity/ui";
import { FormField } from "@sanity/base/components";
import { withDocument } from "part:@sanity/form-builder";
import { AddIcon } from "@sanity/icons";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });
import { nanoid } from "nanoid";
import slugify from "slugify";

export const CreateLanding = React.forwardRef((props, ref) => {
    const { document } = props;
    const { title, pages } = document;
    const [status, setStatus] = useState("default");
    let filteredPages = [];

    if (pages) {
        filteredPages = pages.reduce((previous, current) => {
            const newId = Object.assign({}, current, { _key: nanoid() });
            return previous.concat(newId);
        }, []);
    }

    useEffect(() => {
        let toFetch = true;
        const doc = {
            _id: nanoid(),
            _type: "landing",
            title: title + " Landing Page",
            slug: { current: slugify(title, { lower: true }) },
            pages: filteredPages,
        };

        if (toFetch && status === "creating") {
            client
                .createIfNotExists(doc)
                .then((res) => {
                    client
                        .patch(document._id)
                        .setIfMissing({
                            landing: {
                                _type: "reference",
                                _ref: res._id,
                            },
                        })
                        .commit()
                        .then(() => setStatus("complete"));
                })
                .catch((e) => {
                    console.error(e);
                    setStatus("error");
                });
        }

        return () => (toFetch = false);
    }, [status]);

    return (
        <FormField style={{ transform: "translateY(-50%)" }} ref={ref}>
            <Card>
                {status === "default" && (
                    <Button
                        fontSize={[2, 2, 3]}
                        icon={AddIcon}
                        text="Auto Generate Landing Page"
                        tone="positive"
                        style={{ width: "100%" }}
                        onClick={() => setStatus("creating")}
                    />
                )}
                {status === "creating" && (
                    <Button
                        fontSize={[2, 2, 3]}
                        icon={
                            <Box marginTop={2}>
                                <Flex justify="center">
                                    <Spinner muted />
                                </Flex>
                            </Box>
                        }
                        text="Creating..."
                        disabled
                        style={{ width: "100%" }}
                    />
                )}
                {status === "error" && (
                    <Card padding={[3, 3, 4]} radius={1} shadow={1} tone="critical">
                        <Text align="center" size={[2, 2, 2]}>
                            Sorry, there was an error creating the landing page.
                        </Text>
                    </Card>
                )}
                {status === "complete" && (
                    <Card padding={[3, 3, 4]} radius={1} shadow={1} tone="positive">
                        <Text align="center" size={[2, 2, 2]}>
                            Landing page successfully created.
                        </Text>
                    </Card>
                )}
            </Card>
        </FormField>
    );
});

export default withDocument(CreateLanding);

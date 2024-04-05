import React from "react";
import Preview from "part:@sanity/base/preview";
import { IntentLink } from "part:@sanity/base/router";
import schema from "part:@sanity/base/schema";
import { Item as DefaultItem, List as DefaultList } from "part:@sanity/components/lists/default";
import * as style from "./referringdocuments.module.css";
import { Card, Label, Stack } from "@sanity/ui";

const ReferringDocumentsList = ({ references }) => {
    return (
        <DefaultList>
            <Card padding={[4, 4, 4, 4]} shadow={1} radius={2} className={style.container}>
                <Stack space={[3, 3, 4]}>
                    <Label size={1}>{`This document is referenced in the following ${
                        references.length === 1 ? "place" : "places"
                    }:`}</Label>
                    {references.map((reference) => {
                        const schemaType = schema.get(reference.type);
                        return (
                            <DefaultItem key={reference.id}>
                                {schemaType ? (
                                    <Stack space={[3, 3, 4]}>
                                        <IntentLink
                                            className={style.link}
                                            intent="edit"
                                            params={{ id: reference.id, type: reference.type }}
                                        >
                                            <Card
                                                padding={[2, 2, 2, 2]}
                                                shadow={1}
                                                radius={2}
                                                display={"flex"}
                                                className={style.card}
                                            >
                                                <Preview value={reference} type={schemaType} />
                                            </Card>
                                        </IntentLink>
                                    </Stack>
                                ) : (
                                    <div>
                                        A document of the unknown type <em>{reference.type}</em>
                                    </div>
                                )}
                            </DefaultItem>
                        );
                    })}
                </Stack>
            </Card>
        </DefaultList>
    );
};

export default ReferringDocumentsList;

import React from "react";
import Preview from "part:@sanity/base/preview";
import { IntentLink } from "part:@sanity/base/router";
import schema from "part:@sanity/base/schema";
import { Item as DefaultItem, List as DefaultList } from "part:@sanity/components/lists/default";
import * as style from "./ReferringDocuments.css";
import { Card, Label, Stack } from "@sanity/ui";

const ReferringDocumentsList = (props) => {
    const { documents } = props;
    return (
        <DefaultList>
            <Card padding={[4, 4, 4, 4]} shadow={1} radius={2}>
                <Stack space={[3, 3, 4]}>
                    <Label size={1}>{`This document is referenced within the following ${
                        documents.length === 1 ? "menu" : "menus"
                    }:`}</Label>
                    {documents.map((document) => {
                        const schemaType = schema.get(document._type);
                        return (
                            <DefaultItem key={document._id}>
                                {schemaType ? (
                                    <Stack space={[3, 3, 4]}>
                                        <IntentLink
                                            className={style.link}
                                            intent="edit"
                                            params={{ id: document._id, type: document._type }}
                                        >
                                            <Card
                                                padding={[2, 2, 2, 2]}
                                                shadow={1}
                                                radius={2}
                                                display={"flex"}
                                                className={style.card}
                                            >
                                                <Preview value={document} type={schemaType} />
                                            </Card>
                                        </IntentLink>
                                    </Stack>
                                ) : (
                                    <div>
                                        A document of the unknown type <em>{document._type}</em>
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

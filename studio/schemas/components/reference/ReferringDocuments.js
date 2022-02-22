import React, { useEffect } from "react";
import ReferringDocumentsList from "./ReferringDocumentsList";
import { Item as DefaultItem, List as DefaultList } from "part:@sanity/components/lists/default";
import { Card, Label } from "@sanity/ui";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

const ReferringDocuments = ({ document, referringDocuments }) => {
    useEffect(() => {
        if (referringDocuments) {
            const references = referringDocuments.map((referred) => referred.title);
            const siblings = referringDocuments.map((referred) => {
                const length = referred.pages.length;
                return parseInt(length, 10);
            });

            client
                .patch(document._id)
                .set({
                    referring: references.join(", "),
                    landing: siblings.some((el) => el > 1) ? true : false,
                })
                .commit()
                .catch((err) => {
                    console.error("Oh no, the update to 'referring' failed: ", err.message);
                });
        } 
    }, [referringDocuments]);

    return (
        <>
            {!referringDocuments.length ? (
                <DefaultList>
                    <Card padding={[4, 4, 4, 4]} shadow={1} radius={2} tone="critical">
                        <DefaultItem>
                            <Label size={1}>
                                This document isn't referenced within any menu(s).
                            </Label>
                        </DefaultItem>
                    </Card>
                </DefaultList>
            ) : (
                <ReferringDocumentsList documents={referringDocuments} />
            )}
        </>
    );
};

export default ReferringDocuments;

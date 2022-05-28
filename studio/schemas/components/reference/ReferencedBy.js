import React, { useState, useEffect } from "react";
import { withDocument } from "part:@sanity/form-builder";
import FormField from "part:@sanity/components/formfields/default";
import Spinner from "part:@sanity/components/loading/spinner";
import { Card, Label } from "@sanity/ui";
import { Item as DefaultItem, List as DefaultList } from "part:@sanity/components/lists/default";
import ReferringDocumentsList from "./ReferringDocumentsList";
import sanityClient from "part:@sanity/base/client";
const client = sanityClient.withConfig({ apiVersion: "2022-02-15" });

export const ReferencedBy = React.forwardRef((props, ref) => {
    const [status, setStatus] = useState("loading");
    const [references, setReferences] = useState(null);
    const { type, document } = props;
    const source = type.options.source;
    const forwardTo = type.options.forward.to;
    const forwardFilter = type.options.forward.filter;
    const docId = document?._id ? document._id.replace("drafts.", "") : null;

    const query =
        "*[references($docId) && !(_id in path('drafts.**'))] | order(_type desc) [0...101]  {'id':_id, '_key':_id, 'type':_type, title}";
    const params = { docId: docId };
    const options = { includeResult: false };

    // Fetch
    useEffect(() => {
        let toFetch = true;
        if (toFetch && references === null && docId) {
            client.fetch(query, params).then((results) => {
                setReferences(results);
                setStatus("fetched");
            });
        }
        return () => (toFetch = false);
    }, []);

    // Listener
    useEffect(() => {
        if (docId) {
            const subscription = client.listen(query, params, options).subscribe(() => {
                client.fetch(query, params).then((results) => {
                    if (references === null) {
                        setReferences(results);
                    }
                });
            });
            return () => subscription.unsubscribe();
        }
    }, []);

    useEffect(() => {
        const filteredReferences =
            references !== null ? references.filter((item) => item.type === forwardFilter) : [];
        const filteredReferencesTitles = filteredReferences
            ? filteredReferences.map((a) => a.title + " Menu").join(", ")
            : "";
        const set = () => {
            client
                .patch(document._id)
                .setIfMissing({ referring: [] })
                .append(source, references)
                .set({ [forwardTo]: filteredReferencesTitles })
                .commit();
        };
        const unset = () => {
            client.patch(document._id).unset([source]).unset([forwardTo]).commit();
        };
        const unsetSet = () => {
            client
                .patch(document._id)
                .unset([source])
                .commit()
                .then(() => {
                    client
                        .patch(document._id)
                        .setIfMissing({ referring: [] })
                        .append(source, references)
                        .set({ [forwardTo]: filteredReferencesTitles })
                        .commit();
                });
        };

        if (references !== null) {
            if (document[source]) {
                if (references.length === 0) {
                    unset();
                }
                if (references.length !== document[source].length) {
                    unsetSet();
                }
                if (references.length === document[source].length) {
                    if (JSON.stringify(references) == JSON.stringify(document[source])) {
                        return;
                    } else {
                        unsetSet();
                    }
                }
            } else {
                set();
            }

        }
    }, [references]);

    return (
        <FormField label={""} description={type.description}>
            {status === "loading" ? (
                <Card padding={[4, 4, 4, 4]} shadow={1} radius={2} tone="primary">
                    <Spinner message="Looking for referring documents…" />
                </Card>
            ) : (
                <ReferringDocuments references={references} />
            )}
        </FormField>
    );
});

export default withDocument(ReferencedBy);

const ReferringDocuments = ({ references }) => {
    return (
        <>
            {!references.length ? (
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
                <ReferringDocumentsList references={references} />
            )}
        </>
    );
};

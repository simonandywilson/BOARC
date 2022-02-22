import React from "react";
import { withDocument } from "part:@sanity/form-builder";
import { WithReferringDocuments } from "part:@sanity/base/with-referring-documents";
import FormField from "part:@sanity/components/formfields/default";
import Spinner from "part:@sanity/components/loading/spinner";
import { Card } from "@sanity/ui";
import ReferringDocuments from "./ReferringDocuments";

export const ReferencedBy = React.forwardRef((props, ref) => {
    const { type, markers, presence, compareValue, document } = props;

    return (
        <FormField
            label={""}
            description={type.description}
            __unstable_markers={markers}
            __unstable_presence={presence}
            compareValue={compareValue}
        >
            <WithReferringDocuments id={document._id}>
                {({ referringDocuments, isLoading }) =>
                    isLoading ? (
                        <Card padding={[4, 4, 4, 4]} shadow={1} radius={2} tone="primary">
                            <Spinner message="Looking for referring documents…" />
                        </Card>
                    ) : (
                        <ReferringDocuments
                            document={document}
                            referringDocuments={referringDocuments}
                            isLoading={isLoading}
                        />
                    )
                }
            </WithReferringDocuments>
        </FormField>
    );
});

export default withDocument(ReferencedBy);

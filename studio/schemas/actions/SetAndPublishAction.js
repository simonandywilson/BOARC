import { useState, useEffect } from "react";
import { useDocumentOperation } from "@sanity/react-hooks";

export default function SetAndPublishAction(props) {
    const { patch, publish } = useDocumentOperation(props.id, props.type);
    const [isPublishing, setIsPublishing] = useState(false);

    useEffect(() => {
        if (isPublishing && !props.draft) {
            setIsPublishing(false);
        }
    }, [props.draft]);

    return {
        disabled: publish.disabled,
        label: isPublishing ? "Publishing…" : "Publish",
        onHandle: () => {
            setIsPublishing(true);

            if (props.type === "files") {
                patch.execute([{ set: { publishedAt: new Date().toISOString() } }]);
            }

            publish.execute();

            props.onComplete();
        },
    };
}

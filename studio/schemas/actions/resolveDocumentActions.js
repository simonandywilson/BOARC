import defaultResolve, { PublishAction } from "part:@sanity/base/document-actions";
import SetAndPublishAction from "./SetAndPublishAction";

export default function resolveDocumentActions(props) {
    // return [...defaultResolve(props), SetAndPublishAction];
    return defaultResolve(props).map((Action) => {
        return Action === PublishAction ? SetAndPublishAction : Action;
    });
}

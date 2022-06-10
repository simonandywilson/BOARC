import S from "@sanity/desk-tool/structure-builder";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { ConfigMenu } from "./structure/configMenu";

import {
    HomepageIcon,
    PageIcon,
    ShowIcon,
    EventIcon,
    FAQIcon,
    FilesIcon,
    CommentsIcon,
    SubscriberIcon,
} from "./schemas/styles/Icons";

export default () =>
    S.list()
        .title("Site")
        .items([
            S.listItem()
                .title("Homepage")
                .icon(() => HomepageIcon())
                .child(
                    S.document().title("Homepage").schemaType("homepage").documentId("homepage")
                ),
            S.divider(),
            S.listItem()
                .title("Pages")
                .icon(() => PageIcon())
                .child(
                    S.documentTypeList("page")
                        .title("Pages")
                        .filter("_type == $type")
                        .params({ type: "page" })
                ),
            orderableDocumentListDeskItem({
                type: "faq",
                title: "FAQ",
                icon: () => FAQIcon(),
            }),
            S.divider(),
            S.listItem()
                .title("Events")
                .icon(() => EventIcon())
                .child(
                    S.documentTypeList("event")
                        .title("Events")
                        .filter("_type == $type")
                        .params({ type: "event" })
                ),
            S.listItem()
                .title("Shows")
                .icon(() => ShowIcon())
                .child(
                    S.documentTypeList("show")
                        .title("Shows")
                        .filter("_type == $type")
                        .params({ type: "show" })
                ),
            S.divider(),

            S.listItem()
                .title("Files")
                .icon(() => FilesIcon())
                .child(
                    S.documentTypeList("files")
                        .title("Files")
                        .filter("_type == $type")
                        .params({ type: "files" })
                ),
            S.listItem()
                .title("Comments")
                .icon(() => CommentsIcon())
                .child(
                    S.documentTypeList("comments")
                        .title("Comments")
                        .filter("_type == $type")
                        .params({ type: "comments" })
                ),
            S.listItem()
                .title("Subscribers")
                .icon(() => SubscriberIcon())
                .child(
                    S.documentTypeList("subscriber")
                        .title("Subscribers")
                        .filter("_type == $type")
                        .params({ type: "subscriber" })
                ),
            S.divider(),
            ConfigMenu,
        ]);

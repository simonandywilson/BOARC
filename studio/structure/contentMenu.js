import S from "@sanity/desk-tool/structure-builder";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
    ContentIconLarge,
    PageIconLarge,
    LandingIconLarge,
    DomesIconLarge,
    ShowIconLarge,
    EventIconLarge,
    FAQIconLarge,
    FilesIconLarge,
} from "../schemas/styles/Icons";

export const ContentMenu = S.listItem()
    .title("Content")
    .icon(ContentIconLarge)
    .child(
        S.list()
            .title("Content")
            .items([
                S.listItem()
                    .title("Landing")
                    .icon(LandingIconLarge)
                    .child(
                        S.documentTypeList("landing")
                            .title("Landing Page")
                            .filter("_type == $type")
                            .params({ type: "landing" })
                    ),
                S.listItem()
                    .title("Pages")
                    .icon(PageIconLarge)
                    .child(
                        S.documentTypeList("page")
                            .title("Pages")
                            .filter("_type == $type")
                            .params({ type: "page" })
                    ),
                S.listItem()
                    .title("Domes FM")
                    .icon(DomesIconLarge)
                    .child(S.document().title("Domes FM").schemaType("domes").documentId("domes")),
                S.divider(),
                S.listItem()
                    .title("Events")
                    .icon(EventIconLarge)
                    .child(
                        S.documentTypeList("event")
                            .title("Events")
                            .filter("_type == $type")
                            .params({ type: "event" })
                    ),
                

                S.listItem()
                    .title("Shows")
                    .icon(ShowIconLarge)
                    .child(
                        S.documentTypeList("show")
                            .title("Shows")
                            .filter("_type == $type")
                            .params({ type: "show" })
                    ),
                S.divider(),
                orderableDocumentListDeskItem({
                    type: "faq",
                    title: "FAQ",
                    icon: FAQIconLarge,
                }),
                S.listItem()
                    .title("Files")
                    .icon(FilesIconLarge)
                    .child(
                        S.documentTypeList("files")
                            .title("Files")
                            .filter("_type == $type")
                            .params({ type: "files" })
                    ),
            ])
    );

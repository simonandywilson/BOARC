import S from "@sanity/desk-tool/structure-builder";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { ContentIconLarge, PageIconLarge, FAQIconLarge, FilesIconLarge} from "../schemas/styles/Icons"

export const ContentMenu = S.listItem()
    .title("Content")
    .icon(ContentIconLarge)
    .child(
        S.list()
            .title("Content")
            .items([
                S.listItem()
                    .title("Pages")
                    .icon(PageIconLarge)
                    .child(
                        S.documentTypeList("page")
                            .title("Pages")
                            .filter("_type == $type")
                            .params({ type: "page" })
                    ),
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
